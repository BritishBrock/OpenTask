import { Component, Injectable } from '@angular/core';
import { TaskComponent } from '../../components/task/task.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }
  default:userSettings = {
    keybinds:{
      multiSelect:"shift",
    },
    general:{
      customContextMenu:false,
      showLoadEffect:false,
      defaultMenu:"Visual",
      
    },
    styling:{
      HSLColors:false,
      darkMode:false,
      customStyles:{
        isActive:true,
        styles:{
          bgColor:"#253535",
          txtColor:"black",
          navColor:"rgba(0, 0, 0, 0.764)",
          buttonBgColor:"black",
          buttonTxtColor:"white",
          boardBgColor:"#e0e0e0",
          boardShadow:"#8f8f8f",
        }
      },
    }
  }
  userSettings:userSettings = JSON.parse(JSON.stringify(this.default));
  updatedSettings:Subject<boolean> = new Subject<boolean>();
  loadSettings(){
    if(localStorage.getItem("settings") != null)
    this.userSettings = JSON.parse(localStorage.getItem("settings")!)
  this.updateStyles();
  }
  resetSettings(){
    this.userSettings = JSON.parse(JSON.stringify(this.default))
    this.saveSettings();
    this.updatedSettings.next(true)
  }
  saveSettings(){
    localStorage.setItem("settings",JSON.stringify(this.userSettings))
  }

  updateStyles(){
    if(this.userSettings.styling.customStyles.isActive){
      var r:any = document.getElementById('main');
      if(!r)return;
      Object.entries(this.userSettings.styling.customStyles.styles).every(([key,value])=>{
        r.style.setProperty('--'+key, value);
        return true;
      })
    }else{
   
        var r:any = document.getElementById('main');
        if(!r)return;
        Object.entries(this.userSettings.styling.customStyles.styles).every(([key,value])=>{
          r.style.removeProperty('--'+key, value);
          return true;
        })
      }
  }



}


export interface userSettings{
  keybinds:{
    [key:string]:string,
},
  general:{
    customContextMenu:boolean,
    showLoadEffect:boolean,
    defaultMenu:string,
  },
  styling:{
    HSLColors:boolean,
    darkMode:boolean,
    customStyles:{
      isActive:boolean,
      styles?:any,
    },
  }
}