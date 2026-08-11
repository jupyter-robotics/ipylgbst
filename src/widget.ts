// Copyright (c) Dr. Thorsten Beier
// Distributed under the terms of the Modified BSD License.

import {
  DOMWidgetModel,
  DOMWidgetView,
  ISerializers
} from '@jupyter-widgets/base';

import { MODULE_NAME, MODULE_VERSION } from './version';

// Import the CSS
import '../css/widget.css';

import LegoBoost from 'lego-boost-browser';

// we use globals for the lego boost robot since connecting to
// them takes a long time. If the model would hold the
// boost instance, we would need to re-connect any time
// we restart the kernel.

interface deviceCache {
  [key: string]: any;
}

const device_cache: deviceCache = {};

export class LegoBoostModel extends DOMWidgetModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: LegoBoostModel.model_name,
      _model_module: LegoBoostModel.model_module,
      _model_module_version: LegoBoostModel.model_module_version,
      _view_name: LegoBoostModel.view_name,
      _view_module: LegoBoostModel.view_module,
      _view_module_version: LegoBoostModel.view_module_version,
      _device_info: {},
      name: 'device1'
    };
  }

  private save_device_info() {
    const device_info = {
      polling_frame: this.polling_frame,
      ...this.boost.deviceInfo
    };
    this.set('_device_info', device_info);
    this.save_changes();
  }

  poll() {
    this.polling_frame += 1;
    this.save_device_info();
  }
  polling() {
    this.poll();
    if (!this.stop_polling) {
      this.polling_is_running = true;
      setTimeout(this.polling.bind(this), 200);
    } else {
      this.polling_is_running = false;
    }
  }

  initialize(attributes: any, options: any) {
    super.initialize(attributes, options);
    const name: string = this.get('name');
    console.log(`initialize with name=${name}`);
    if (!(name in device_cache)) {
      device_cache[name] = new LegoBoost();
    }

    this.boost = device_cache[name];

    this.on('msg:custom', async (content: any) => {
      switch (content.event) {
        case 'start-task':
          console.log(`Received ${content.task_type} task`);

          try {
            // Connect is always allowed if the device is not already connected
            if (
              !this.boost.deviceInfo.connected &&
              content.task_type === 'connect'
            ) {
              await this.connect();

              this.send({
                event: 'task-finished',
                task_uuid: content.task_uuid,
                task_type: content.task_type
              });
              return;
            }

            // Disconnect can also be called even if already disconnected
            if (
              this.boost.deviceInfo.connected &&
              content.task_type === 'disconnect'
            ) {
              this.disconnect();

              this.send({
                event: 'task-finished',
                task_uuid: content.task_uuid,
                task_type: content.task_type
              });
              return;
            }

            // All other commands require a connection
            if (!this.boost.deviceInfo.connected) {
              throw new Error('Boost is not connected.');
            }

            switch (content.task_type) {
              case 'motor-time':
                await this.boost.motorTimeAsync(
                  content.data.port,
                  content.data.seconds,
                  content.data.power,
                  content.data.wait
                );
                break;

              case 'motor-angle':
                await this.boost.motorAngleAsync(
                  content.data.port,
                  content.data.angle,
                  content.data.power,
                  content.data.wait
                );
                break;

              case 'motor-angle-multi':
                await this.boost.motorAngleMultiAsync(
                  content.data.angle,
                  content.data.power_a,
                  content.data.power_b,
                  content.data.wait
                );
                break;

              case 'motor-time-multi':
                await this.boost.motorTimeMultiAsync(
                  content.data.seconds,
                  content.data.power_a,
                  content.data.power_b,
                  content.data.wait
                );
                break;

              case 'set-led':
                await this.boost.ledAsync(content.data.color);
                break;

              default:
                console.error('Unknown task type.');
                break;
            }

            this.send({
              event: 'task-finished',
              task_uuid: content.task_uuid,
              task_type: content.task_type
            });
          } catch (err) {
            console.error(
              'task failed for',
              content.task_uuid,
              content.task_type,
              err
            );
            try {
              this.send({
                event: 'task-cancelled',
                task_uuid: content.task_uuid,
                task_type: content.task_type,
                error: String(err)
              });
            } catch (e) {
              console.error(
                'failed to send cancel for',
                content.task_uuid,
                content.task_type,
                e
              );
            }
          }
          break;
      }
      switch (content.event) {
        case 'cancel-task':
          try {
            if (
              content.task_type === 'motor-time' ||
              content.task_type === 'motor-angle' ||
              content.task_type === 'motor-time-multi' ||
              content.task_type === 'motor-angle-multi'
            ) {
              // common stop: zero-power motors
              this.boost.motorTimeMulti(0, 0, 0);
            }
            if (content.task_type === 'set-led') {
              // common stop: turn off led
              this.boost.led('off');
            }
            this.send({
              event: 'task-cancelled',
              task_uuid: content.task_uuid
            });
          } catch (err) {
            console.error(
              'task cancel failed for',
              content.task_uuid,
              content.task_type,
              err
            );
          }
          break;
      }
    });
  }

  async connect() {
    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

    if (!this.boost.deviceInfo.connected) {
      console.log('not connected yet');
      await this.boost.connect();

      for (let i = 0; i < 30; i++) {
        await sleep(100);
        if (
          this.boost.deviceInfo.connected &&
          this.boost.hub !== undefined &&
          this.boost.hub.connected
        ) {
          break;
        }
      }
      await sleep(4000);
    }

    if (!this.polling_is_running) {
      this.polling_is_running = true;
      setTimeout(this.polling.bind(this), 200);
    }
  }

  static serializers: ISerializers = {
    ...DOMWidgetModel.serializers
    // Add any extra serializers here
  };

  disconnect() {
    console.log('disconnect');
    this.boost.disconnect();
  }

  dispose() {
    console.log('remove model');
  }
  boost: LegoBoost;

  private polling_frame = 0;

  private polling_is_running = false;
  stop_polling = false;
  //private currentProcessing: Promise<void> = Promise.resolve();

  static model_name = 'LegoBoostModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'LegoBoostView'; // Set to null if no view
  static view_module = MODULE_NAME; // Set to null if no view
  static view_module_version = MODULE_VERSION;
}

export class LegoBoostView extends DOMWidgetView {
  txt_connected: HTMLDivElement;
  txt_bluetooth: HTMLDivElement;

  txt_pitch: HTMLDivElement;
  txt_roll: HTMLDivElement;
  txt_distance: HTMLDivElement;
  txt_color: HTMLDivElement;

  txt_port_a: HTMLDivElement;
  txt_port_b: HTMLDivElement;
  txt_port_ab: HTMLDivElement;
  txt_port_c: HTMLDivElement;
  txt_port_d: HTMLDivElement;

  meter_pitch: HTMLMeterElement;
  meter_roll: HTMLMeterElement;
  meter_distance: HTMLMeterElement;
  color_color: HTMLDivElement;

  isWebBluetoothSupported: boolean = navigator.bluetooth ? true : false;

  render() {
    this.el.classList.add('custom-widget');

    // checking if Web Bluetooth API is supported
    if (!this.isWebBluetoothSupported) {
      // bluetooth error box
      const bluetooth_box = document.createElement('div');
      bluetooth_box.classList.add('error-box');
      this.el.appendChild(bluetooth_box);

      this.txt_bluetooth = document.createElement('div');
      this.txt_bluetooth.textContent =
        "Your device doesn't support Web Bluetooth API. Try to turn on Experimental Platform Features from Chrome, by accessing the following link and turning it on: chrome://flags/#enable-experimental-web-platform-features";
      bluetooth_box.appendChild(this.txt_bluetooth);

      console.log(
        "Your device doesn't support Web Bluetooth API. Try to turn on Experimental Platform Features from Chrome, by accessing the following link and turning it on: chrome://flags/#enable-experimental-web-platform-features"
      );
    }

    // connection box
    const connection_box = document.createElement('div');
    connection_box.classList.add('box');
    this.el.appendChild(connection_box);

    // sensor box
    const sensor_box = document.createElement('div');
    sensor_box.classList.add('box');
    this.el.appendChild(sensor_box);

    // motor box
    const motor_box = document.createElement('div');
    motor_box.classList.add('box');
    this.el.appendChild(motor_box);

    // connected
    this.txt_connected = document.createElement('div');
    this.txt_connected.textContent = 'Disconnected';
    connection_box.appendChild(this.txt_connected);

    // pitch
    this.txt_pitch = document.createElement('div');
    this.txt_pitch.textContent = 'pitch1:';
    sensor_box.appendChild(this.txt_pitch);
    this.meter_pitch = document.createElement('meter');
    sensor_box.appendChild(this.meter_pitch);
    this.meter_pitch.min = -90;
    this.meter_pitch.max = 90;

    // roll
    this.el.appendChild(document.createElement('br'));
    this.txt_roll = document.createElement('div');
    this.txt_roll.textContent = 'roll:';
    sensor_box.appendChild(this.txt_roll);
    this.meter_roll = document.createElement('meter');
    sensor_box.appendChild(this.meter_roll);
    this.meter_roll.min = -90;
    this.meter_roll.max = 90;

    // distance
    sensor_box.appendChild(document.createElement('br'));
    this.txt_distance = document.createElement('div');
    this.txt_distance.textContent = 'distance:';
    sensor_box.appendChild(this.txt_distance);
    this.meter_distance = document.createElement('meter');
    sensor_box.appendChild(this.meter_distance);
    this.meter_distance.min = 0;
    this.meter_distance.max = 255;

    // color
    sensor_box.appendChild(document.createElement('br'));
    this.txt_color = document.createElement('div');
    this.txt_color.textContent = 'color:';
    sensor_box.appendChild(this.txt_color);
    this.color_color = document.createElement('div');
    sensor_box.appendChild(this.color_color);
    this.color_color.textContent = 'None';
    this.changes();

    // motor ports
    motor_box.appendChild(document.createElement('br'));
    this.txt_port_a = document.createElement('div');
    this.txt_port_a.textContent = 'Port A:';
    motor_box.appendChild(this.txt_port_a);

    motor_box.appendChild(document.createElement('br'));
    this.txt_port_b = document.createElement('div');
    this.txt_port_b.textContent = 'Port B:';
    motor_box.appendChild(this.txt_port_b);

    motor_box.appendChild(document.createElement('br'));
    this.txt_port_ab = document.createElement('div');
    this.txt_port_ab.textContent = 'Port AB:';
    motor_box.appendChild(this.txt_port_ab);

    motor_box.appendChild(document.createElement('br'));
    this.txt_port_c = document.createElement('div');
    this.txt_port_c.textContent = 'Port C:';
    motor_box.appendChild(this.txt_port_c);

    motor_box.appendChild(document.createElement('br'));
    this.txt_port_d = document.createElement('div');
    this.txt_port_d.textContent = 'Port D:';
    motor_box.appendChild(this.txt_port_d);

    this.model.on('change:_device_info', this.changes, this);
  }

  changes() {
    const b = <LegoBoostModel>this.model;

    const di = b.boost.deviceInfo;

    if (di.connected !== undefined && di.connected) {
      this.txt_connected.textContent = 'Connected';

      this.meter_roll.value = di['tilt']['roll'];
      this.txt_roll.textContent = `roll: ${di['tilt']['roll']}`;

      this.meter_pitch.value = di['tilt']['pitch'];
      this.txt_pitch.textContent = `pitch1: ${di['tilt']['pitch']}`;

      const d = di['distance'];
      if (d !== undefined && d !== null && isFinite(d)) {
        this.meter_distance.value = d;
        this.txt_distance.textContent = `distance: ${d}`;
      } else {
        this.meter_distance.value = 255;
        this.txt_distance.textContent = 'distance: ∞';
      }

      const c = di['color'];
      if (c !== undefined && c !== null) {
        this.color_color.textContent = `${c}`;
        this.color_color.style.backgroundColor = c;
        //this.txt_color.textContent = `color: ${c}`
      } else {
        this.color_color.textContent = 'None';
        this.color_color.style.backgroundColor = '#444';
        //this.txt_color.textContent = `color: None`
      }
      this.txt_port_a.textContent = `Port A:  ${di['ports']['A']['action']} ${di['ports']['A']['angle']}`;
      this.txt_port_b.textContent = `Port B:  ${di['ports']['B']['action']} ${di['ports']['B']['angle']}`;
      this.txt_port_ab.textContent = `Port AB: ${di['ports']['AB']['action']} ${di['ports']['AB']['angle']}`;
      this.txt_port_c.textContent = `Port C:  ${di['ports']['C']['action']} ${di['ports']['C']['angle']}`;
      this.txt_port_d.textContent = `Port D:  ${di['ports']['D']['action']} ${di['ports']['D']['angle']}`;
    } else {
      this.txt_connected.textContent = 'Disconnected';
    }
  }

  remove() {
    // this.stop_polling = true;
    const b = <LegoBoostModel>this.model;
    b.stop_polling = true;
  }
}
