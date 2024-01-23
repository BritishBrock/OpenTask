import { Component } from '@angular/core';
import { ContextMenuService } from '../../Services/ContextMenu/context-menu.service';
import { Coord } from '../../interfaces/Coord/Coord';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss'
})
export class ContextMenuComponent {
    constructor(private ContextMenuService:ContextMenuService){

    }
    ngOnInit(){
      this.ContextMenuService.isOpen.subscribe((isOpen:boolean)=>{
        document.getElementById("contextMenuBody")!.style.display = isOpen ? "grid": "none";
      })
      this.ContextMenuService.displayOfContextMenu.subscribe((coords:Coord)=>{
        document.getElementById("contextMenuBody")!.style.left = coords.x + "px";
        document.getElementById("contextMenuBody")!.style.top = coords.y + "px";
      })
    }


    MoveToFront(){
      console.log("move to front")
    }
}
