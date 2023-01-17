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
      polling_frame: 0,
      command_frame: 0,
      device_info:{}
    };
  }

  poll(){
   
    this.set('device_info',this.boost.deviceInfo)
    this.set('polling_frame', this.get('polling_frame')+1);
    this.save_changes();
    
  }
  polling(){
    this.poll();
    if(!this.stop_polling){
      this.polling_is_running = true;
      setTimeout(this.polling.bind(this), 50);
    }else{
      this.polling_is_running = false;
    }
  }


  initialize(attributes: any, options: any) {
    console.log("INITIALIZE")
    super.initialize(attributes, options);  
    this.boost =  boost; //new LegoBoost();


    this.on('msg:custom', (command: any, buffers: any) => {
      this.currentProcessing = this.currentProcessing.then(async () => {
        await this.onCommand(command, buffers);
        this.set('command_frame', this.get('command_frame') + 1 );
        this.save_changes();
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
          console.log("early exit1")
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
      this.polling();
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
  txt_pitch:   HTMLDivElement;
  txt_roll:    HTMLDivElement;
  txt_distance  : HTMLDivElement;


  meter_pitch:   HTMLMeterElement;
  meter_roll:    HTMLMeterElement;
  meter_distance  : HTMLMeterElement;



  render() {

    this.el.classList.add('custom-widget');


    this.txt_pitch = document.createElement("div");
    this.txt_pitch.textContent = "pitch:"
    this.el.appendChild(this.txt_pitch);
    this.meter_pitch = document.createElement('meter');
    this.el.appendChild(this.meter_pitch);
    this.meter_pitch.min = -90
    this.meter_pitch.max = 90


    this.el.appendChild(document.createElement("br"));
    this.txt_roll = document.createElement("div");
    this.txt_roll.textContent = "roll:"
    this.el.appendChild(this.txt_roll);
    this.meter_roll = document.createElement('meter');
    this.el.appendChild(this.meter_roll);
    this.meter_roll.min = -90
    this.meter_roll.max = 90

    this.el.appendChild(document.createElement("br"));
    this.txt_distance = document.createElement("div");
    this.txt_distance.textContent = "distance:"
    this.el.appendChild(this.txt_distance);
    this.meter_distance = document.createElement('meter');
    this.el.appendChild(this.meter_distance);
    this.meter_distance.min = 0
    this.meter_distance.max = 255


    this.changes();
    
    this.model.on('change:polling_frame',   this.changes, this);

  }

  changes() {

    let b = <LegoBoostModel>(this.model); 

    const di = b.boost.deviceInfo;

    if(di.connected !== undefined && di.connected){
      this.meter_roll.value = di['tilt']['roll'];
      this.txt_roll.textContent = `roll: ${di['tilt']['roll']}`

      this.meter_pitch.value = di['tilt']['pitch'];
      this.txt_pitch.textContent = `pitch: ${di['tilt']['pitch']}`

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
  }

  remove() {
    // this.stop_polling = true;
    let b = <LegoBoostModel>(this.model); 
    b.stop_polling = true;
  }
}
