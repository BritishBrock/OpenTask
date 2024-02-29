import { Injectable } from '@angular/core';

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
  },
}