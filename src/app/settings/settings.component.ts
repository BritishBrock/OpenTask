import { Component, ElementRef, ViewChild } from '@angular/core';
import { GeneralComponent } from './general/general.component';
import { KeybindsComponent } from './keybinds/keybinds.component';
import { Router } from '@angular/router';
import { SettingsService } from '../Services/settings/settings.service';
import { DefaultMenuSelectorComponent } from './default-menu-selector/default-menu-selector.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  currentlyActiveSettingsMenu:any = GeneralComponent;
  @ViewChild("sidebar")sidebar?:ElementRef;

  constructor(private router:Router){}

  settingsMenu = [
    {
      title:"general",
      onclick:()=>{
        this.currentlyActiveSettingsMenu = GeneralComponent;
      
      }
    },
    {
      title:"Keybinds",
      onclick:()=>{
        this.currentlyActiveSettingsMenu = KeybindsComponent;
      }
    },
    {
      title:"Keybinds",
      onclick:()=>{
        this.currentlyActiveSettingsMenu = DefaultMenuSelectorComponent;
      }
    },
    {
      title:"Back",
      onclick:()=>{
        this.router.navigateByUrl("/");
      }
    }
  ]
  isSettingsNavOpen:boolean = true;
  togleNav(){
    this.isSettingsNavOpen  = !this.isSettingsNavOpen;
    if(!this.sidebar) return;
    if(this.isSettingsNavOpen) {
      this.sidebar.nativeElement.classList.remove("closed")
   }
    else {
      this.sidebar.nativeElement.classList.add("closed")
    }
  }

}
