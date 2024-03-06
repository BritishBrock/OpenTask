import { Component, Injectable } from '@angular/core';
import { TaskComponent } from '../../components/task/task.component';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  userSettings:userSettings = {
    keybinds:{
      multiSelect:"shift",
    },
    general:{
      customContextMenu:false,
      showLoadEffect:false,
      defaultMenu:"Visual",
      darkMode:true,
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
    darkMode:boolean,
  },
}