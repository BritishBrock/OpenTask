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
      if(this.stylingSettings.customStyles.isActive)this.updateStyles();
    })
    if(this.stylingSettings.customStyles.isActive)this.updateStyles();
  }

 

  updateStyles(){
   this.settingsService.updateStyles();
  }
 
  
}
