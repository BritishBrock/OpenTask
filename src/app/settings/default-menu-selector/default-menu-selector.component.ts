import { Component } from '@angular/core';
import { SettingsService } from '../../Services/settings/settings.service';

@Component({
  selector: 'app-default-menu-selector',
  templateUrl: './default-menu-selector.component.html',
  styleUrl: './default-menu-selector.component.scss'
})
export class DefaultMenuSelectorComponent {
  constructor(private settingsService:SettingsService) {}
  generalSettings = this.settingsService.userSettings.general;
}
