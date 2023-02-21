// Copyright (c) Dr. Thorsten Beier
// Distributed under the terms of the Modified BSD License.

import {
  DOMWidgetModel,
  DOMWidgetView,
  ISerializers,
} from '@jupyter-widgets/base';

import { MODULE_NAME, MODULE_VERSION } from './version';

// Import the CSS
import '../css/widget.css';



import LegoBoost from 'lego-boost-browser';
let boost = new LegoBoost();






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
      _device_info:{}
    };
  }

  private save_device_info(){
    var device_info = {
      polling_frame:this.polling_frame,
      command_frame:this.command_frame,
      ... this.boost.deviceInfo
    };

    this.set('_device_info',device_info)
    //this.get('device_info')['polling_frame'] = this.polling_frame;
    this.save_changes();
  }

  poll(){
    this.polling_frame += 1;
    this.save_device_info();
  }
  polling(){
    this.poll();
    if(!this.stop_polling){
      this.polling_is_running = true;
      setTimeout(this.polling.bind(this), 200);
    }else{
      this.polling_is_running = false;
    }
  }


  initialize(attributes: any, options: any) {
    super.initialize(attributes, options);  
    this.boost =  boost; //new LegoBoost();


    this.on('msg:custom', (command: any, buffers: any) => {
      this.currentProcessing = this.currentProcessing.then(async () => {
        await this.onCommand(command, buffers);

        this.command_frame += 1;
        this.save_device_info();
        console.log("done cmd and save",command,this.command_frame);
      });
    });
  }


  private async onCommand(command: any, buffers: any) {
     console.log("onCommand", command);
     const cmd = command['command'];
     const args = command['args'];



     if(cmd === "connect"){
       await this.connect();
     }
     else if(cmd === "disconnect"){
         this.disconnect();
     }
     else{
        if(this.boost.deviceInfo.connected){


          switch(cmd){

              case "poll":
              this.poll();
              break;
              
              case "drive":
              await this.boost.drive.apply(this.boost, args);
              break;
   
              case "turn":
              await this.boost.turn.apply(this.boost, args);
              break;
   
              case "driveUntil":
              await this.boost.driveUntil.apply(this.boost, args);
              break;

              case "turnUntil":
              await this.boost.turnUntil.apply(this.boost, args);
              break;
   
              case "ledAsync":
              await this.boost.ledAsync.apply(this.boost, args);
              break;

              case "motorTime":
              await this.boost.motorTime.apply(this.boost, args);
              break;

              case "motorTimeMulti":
              await this.boost.motorTimeMulti.apply(this.boost, args);
              break;

              case "motorTimeAsync":
              await this.boost.motorTimeAsync.apply(this.boost, args);
              break;

              case "motorTimeMultiAsync":
              await this.boost.motorTimeMultiAsync.apply(this.boost, args);
              break;

              case "motorAngle":
              await this.boost.motorAngle.apply(this.boost, args);
              break;

              case "motorAngleMulti":
              await this.boost.motorAngleMulti.apply(this.boost, args);
              break;

              case "motorAngleAsync":
              await this.boost.motorAngleAsync.apply(this.boost, args);
              break;

              case "motorAngleMultiAsync":
              await this.boost.motorAngleMultiAsync.apply(this.boost, args);
              break;

              default:
                console.log(`unknown command "${cmd}"`)
                break;
          }

       }
       else{
          console.log(`cannot run command ${cmd} since we are not connected`)
       }
    }
  }


  async connect(){

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    if(!this.boost.deviceInfo.connected){
      await this.boost.connect();

      for (let i : number = 0; i < 30; i++) {
        // console.log("pre sleep")
        await sleep(100);
        // console.log("post sleep")
        if(this.boost.deviceInfo.connected && this.boost.hub !== undefined && this.boost.hub.connected ){
          break
        }
      } 
      await sleep(4000);
    }
    else{
      console.log("alreay connected")
    }

    if(!this.polling_is_running){
      this.polling_is_running = true;
      setTimeout(this.polling.bind(this), 200);
      //this.polling();
    }

  }

  static serializers: ISerializers = {
    ...DOMWidgetModel.serializers,
    // Add any extra serializers here
  };


  disconnect(){
    console.log("disconnect");
    this.boost.disconnect();
  }


  dispose() {
    console.log('remove model');
  }
  boost: LegoBoost;

  private polling_frame: number = 0;
  private command_frame: number = 0;

  private polling_is_running: Boolean = false;
  stop_polling: Boolean = false;
  private currentProcessing: Promise<void> = Promise.resolve();

  static model_name = 'LegoBoostModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'LegoBoostView'; // Set to null if no view
  static view_module = MODULE_NAME; // Set to null if no view
  static view_module_version = MODULE_VERSION;
}


export class LegoBoostView extends DOMWidgetView {
  
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  txt_pitch:   HTMLDivElement;
  txt_roll:    HTMLDivElement;
  txt_distance  : HTMLDivElement;
  

  meter_pitch:   HTMLMeterElement;
  meter_roll:    HTMLMeterElement;
  meter_distance  : HTMLMeterElement;




  render() {

    this.el.classList.add('custom-widget');

    // sensor-canvas box
    let sensor_box =  document.createElement("div");
    sensor_box.classList.add('box');
    this.el.appendChild(sensor_box);

    // canvas
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d")!;
    sensor_box.appendChild(this.canvas);
    this.canvas.width = 400
    this.canvas.height = 100




    



    // meter box
    let meter_box =  document.createElement("div");
    meter_box.classList.add('box');
    this.el.appendChild(meter_box);




    this.txt_pitch = document.createElement("div");
    this.txt_pitch.textContent = "pitch1:"
    meter_box.appendChild(this.txt_pitch);
    this.meter_pitch = document.createElement('meter');
    meter_box.appendChild(this.meter_pitch);
    this.meter_pitch.min = -90
    this.meter_pitch.max = 90


    this.el.appendChild(document.createElement("br"));
    this.txt_roll = document.createElement("div");
    this.txt_roll.textContent = "roll:"
    meter_box.appendChild(this.txt_roll);
    this.meter_roll = document.createElement('meter');
    meter_box.appendChild(this.meter_roll);
    this.meter_roll.min = -90
    this.meter_roll.max = 90

    meter_box.appendChild(document.createElement("br"));
    this.txt_distance = document.createElement("div");
    this.txt_distance.textContent = "distance:"
    meter_box.appendChild(this.txt_distance);
    this.meter_distance = document.createElement('meter');
    meter_box.appendChild(this.meter_distance);
    this.meter_distance.min = 0
    this.meter_distance.max = 255


    this.changes();
    
    this.model.on('change:_device_info',   this.changes, this);

  }

  degrees_to_radians(degrees:number)
  {
    return degrees * (Math.PI/180);
  }


  draw_circle_meter(x:number, y:number, r:number, angle:number){

    // the circle itself
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2*Math.PI);
    ctx.stroke();

    // the line which indicates the angle
    let a = this.degrees_to_radians(angle);
    let dy = Math.sin(a)*r;
    let dx = Math.cos(a)*r;

    ctx.beginPath();
    ctx.moveTo(x-dx, y-dy); // Move the pen to (30, 50)
    ctx.lineTo(x+dx, y+dy); // Draw a line to (150, 100)
    ctx.stroke();
  }

  draw_rectangle_meter(x:number, y:number, sx: number, sy:number, angle:number){
    let ctx = this.ctx;
    let cx = x + sx/2.0;
    let cy = y + sy/2.0;

    ctx.save();

    ctx.strokeStyle = 'black';

    ctx.translate(cx,cy);
    ctx.rotate(this.degrees_to_radians(angle));
    ctx.translate(-cx,-cy);


    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, sx, sy);
    ctx.fillStyle = 'gray';
    ctx.fillRect(x, y+sy/2, sx, sy/2);

    ctx.beginPath()
    ctx.rect(x,y, sx, sy);
    ctx.stroke();

    ctx.restore();
  }

  changes() {

    let b = <LegoBoostModel>(this.model); 

    const di = b.boost.deviceInfo;



    let w = 30;
    let y = 50;

    if(di.connected !== undefined && di.connected){
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.meter_roll.value = di['tilt']['roll'];
      this.txt_roll.textContent = `roll: ${di['tilt']['roll']}`
      this.draw_rectangle_meter(w*1, y, w,w, di['tilt']['roll']);

      this.meter_pitch.value = di['tilt']['pitch'];
      this.txt_pitch.textContent = `pitch1: ${di['tilt']['pitch']}`
      this.draw_rectangle_meter(w*4, y, w*3,w, di['tilt']['pitch']);

      const d = di['distance'];
      if(d !== undefined && d!== null && isFinite(d)){
        this.meter_distance.value  = d;
        this.txt_distance.textContent = `distance: ${d}`
      }
      else{
        this.meter_distance.value  = 255;
        this.txt_distance.textContent = `distance: ∞`
      }
    } 
    else{
      this.draw_rectangle_meter(w*1, y, w,w, 0);
      this.draw_rectangle_meter(w*3, y, w*3,w, 0);
    }
  }

  remove() {
    // this.stop_polling = true;
    let b = <LegoBoostModel>(this.model); 
    b.stop_polling = true;
  }
}
