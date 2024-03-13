import { Component } from '@angular/core';
import { SettingsService } from '../../Services/settings/settings.service';

@Component({
  selector: 'app-styling',
  templateUrl: './styling.component.html',
  styleUrl: './styling.component.scss'
})
export class StylingComponent {
  constructor(private settingsService:SettingsService) {}
  stylingSettings = this.settingsService.userSettings.styling;
  ngOnInit(){
    this.settingsService.updatedSettings.subscribe(()=>{
      this.stylingSettings = this.settingsService.userSettings.styling;
    })
  }

  customStylesColors:any = {
    bgColor:"#253535",
    txtColor:"black",
    navColor:"rgba(0, 0, 0, 0.764)",
    buttonBgColor:"black",
    buttonTxtColor:"white",
    boardBgColor:"#e0e0e0",
    boardShadow:"#8f8f8f",
  }

  updateStyles(){
    var r:any = document.querySelector('.custom');
    console.log(this.customStylesColors)
    if(!r)return;
    Object.entries(this.customStylesColors).every(([key,value])=>{
      r.style.setProperty('--'+key, value);
      return true;
    })
  }

  
}
