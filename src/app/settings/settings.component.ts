import { Component, ElementRef, ViewChild } from '@angular/core';
import { GeneralComponent } from './general/general.component';
import { KeybindsComponent } from './keybinds/keybinds.component';
import { Router } from '@angular/router';
import { SettingsService } from '../Services/settings/settings.service';
import { DefaultMenuSelectorComponent } from './default-menu-selector/default-menu-selector.component';
import { StylingComponent } from './styling/styling.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  currentlyActiveSettingsMenu:any = GeneralComponent;
  @ViewChild("sidebar")sidebar?:ElementRef;

  constructor(private router:Router,private settingsService:SettingsService,private location:Location){}

  resetSettings(){
    this.settingsService.resetSettings();
  }
  saveSettings(){
    this.settingsService.saveSettings();
  }
  settingsMenu = [
    {
      title:"general",
      onclick:(index:number)=>{
        this.currentlyActiveSettingsMenu = GeneralComponent;
        this.setActive(index);
      }
    },
    {
      title:"Default Screen",
      onclick:(index:number)=>{
        this.currentlyActiveSettingsMenu = DefaultMenuSelectorComponent;
        this.setActive(index);
      }
    },
    {
      title:"Keybinds",
      onclick:(index:number)=>{
        this.currentlyActiveSettingsMenu = KeybindsComponent;
        this.setActive(index);
      }
    },
    {
      title:"Styling",
      onclick:(index:number)=>{
        this.currentlyActiveSettingsMenu = StylingComponent;
        this.setActive(index);
      }
    },
    {
      title:"Back",
      onclick:(index:number)=>{
        this.location.back();
        this.setActive(index);
      }
    }
  ]

  setActive(index:number){
    let menus = document.getElementsByClassName("settingsOption");
    for(let i = 0; i < menus.length;i++){
      if(menus[i].classList.contains("active"))menus[i].classList.remove("active")
    }
    menus[index].classList.add("active");
  }


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
