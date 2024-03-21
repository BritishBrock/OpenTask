import { Component, ElementRef } from '@angular/core';
import { SettingsService } from '../../Services/settings/settings.service';

@Component({
  selector: 'app-keybinds',
  templateUrl: './keybinds.component.html',
  styleUrl: './keybinds.component.scss'
})
export class KeybindsComponent {
  constructor(private settingsService:SettingsService) {
  }
  keyBindToChange:string = ""
  nativeElement?:HTMLElement;
  keybindings = this.settingsService.userSettings.keybinds;

  ngOnInit(){
     window.addEventListener("keydown",this.handler);
     this.settingsService.updatedSettings.subscribe(()=>{
      this.keybindings = this.settingsService.userSettings.keybinds;
    })
  }

  changeKey(keybind:string){
    this.keyBindToChange  = keybind;
  }
  handler = (event:any)=>{
    if(this.keyBindToChange == "") return;
    this.keybindings[ this.keyBindToChange as keyof typeof this.keybindings ] = event.key;  
    this.keyBindToChange = "";
   }


  ngOnDestroy(){
    window.removeEventListener("keydown",this.handler)
  }
}
