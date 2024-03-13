import { Component } from '@angular/core';
import { ContextMenuService } from '../../Services/ContextMenu/context-menu.service';
import { Coord } from '../../interfaces/Coord/Coord';
import { SettingsService } from '../../Services/settings/settings.service';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss'
})
export class ContextMenuComponent {
    constructor(private ContextMenuService:ContextMenuService,private settingsService:SettingsService){

    }
    ngOnInit(){
      if(!this.settingsService.userSettings.general.customContextMenu)return;
      

      this.ContextMenuService.isOpen.subscribe((isOpen:boolean)=>{
        document.getElementById("contextMenuBody")!.style.display = isOpen ? "grid": "none";
      })
      this.ContextMenuService.displayOfContextMenu.subscribe((coords:Coord)=>{
        document.getElementById("contextMenuBody")!.style.left = coords.x + "px";
        document.getElementById("contextMenuBody")!.style.top = coords.y + "px";
      })
    }
    maxIndex:any = 0;

    moveZIndex(direction:number){
      if(!this.ContextMenuService.element || !this.ContextMenuService.element.zIndex)return;
      this.ContextMenuService.element.zIndex+=direction;
      if(this.ContextMenuService.element.zIndex > this.maxIndex)this.maxIndex = this.ContextMenuService.element.zIndex;
      this.ContextMenuService.element.htmlElement.style.zIndex =this.ContextMenuService.element.zIndex+ "";
      this.ContextMenuService.switchContextMenu();
    }
   setZIndex(direction:number){
      if(!this.ContextMenuService.element || !this.ContextMenuService.element.zIndex)return;
      this.ContextMenuService.element.zIndex = direction;
      if(this.ContextMenuService.element.zIndex > this.maxIndex)this.maxIndex = this.ContextMenuService.element.zIndex;
      this.ContextMenuService.element.htmlElement.style.zIndex =this.ContextMenuService.element.zIndex+ "";
      this.ContextMenuService.switchContextMenu();
    }
}
