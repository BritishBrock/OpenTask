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

  changLanguage(language:string){
    window.location.replace('https://opentask-556b9.web.app/'+language)
  }
}
