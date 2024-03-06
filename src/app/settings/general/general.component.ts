import { Component } from '@angular/core';
import { SettingsService } from '../../Services/settings/settings.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrl: './general.component.scss'
})
export class GeneralComponent {
  constructor(private settingsService:SettingsService) {}
  generalSettings = this.settingsService.userSettings.general;
  ngOnInit(){
    this.settingsService.updatedSettings.subscribe(()=>{
      this.generalSettings = this.settingsService.userSettings.general;
    })
  }
}
