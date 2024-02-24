import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  userSettings:userSettings = {
    keybinds:{
      multiSelect:"shift",
    }
  }



}


export interface userSettings{
  keybinds:keyBinds,
}
export interface keyBinds{
    [key:string]:string,
}