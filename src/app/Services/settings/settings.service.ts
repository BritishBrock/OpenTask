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
      darkMode:false,
      customStyles:false,
    }
  }
  userSettings:userSettings = JSON.parse(JSON.stringify(this.default));
  updatedSettings:Subject<boolean> = new Subject<boolean>();
  loadSettings(){
    if(localStorage.getItem("settings") != null)
    this.userSettings = JSON.parse(localStorage.getItem("settings")!)
  }
  resetSettings(){
    this.userSettings = JSON.parse(JSON.stringify(this.default))
    this.saveSettings();
    this.updatedSettings.next(true)
  }
  saveSettings(){
    localStorage.setItem("settings",JSON.stringify(this.userSettings))
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
    darkMode:boolean,
    customStyles:boolean,
  }
}