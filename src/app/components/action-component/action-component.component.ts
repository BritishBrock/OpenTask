import { Component, Input } from '@angular/core';
import { DragServiceService } from '../../Services/DragService/drag-service.service';
import { Coord } from '../../interfaces/Coord/Coord';
import { ContextMenuService } from '../../Services/ContextMenu/context-menu.service';

@Component({
  selector: 'app-action-component',
  templateUrl: './action-component.component.html',
  styleUrl: './action-component.component.scss'
})
export class ActionComponentComponent {
  @Input() nativeElement?:HTMLElement;

constructor(private DragService:DragServiceService,private ContextMenuService:ContextMenuService){}

  ngOnInit(){
    if(this.nativeElement) {

      this.mousedown();
     
      this.nativeElement.addEventListener("mouseup",(event:any)=>{
        if(this.DragService.htmlElementSelected)
        this.DragService.clearSelectedHTMLElement();
  
      })
    }
  }

  mousedown(){
    if(!this.nativeElement) return;
    this.nativeElement.addEventListener("mousedown",(event:any)=>{
      switch (event.which) {
          case 1:
            if(this.ContextMenuService._isOpen) this.ContextMenuService.switchContextMenu();
            if(!this.DragService.htmlElementSelected)this.DragService.selectHTMLElement(this.nativeElement!);
          break;
          case 2: break;
          case 3:
             this.openContectMenu({x:event.x,y:event.y});
          break;
      }
    })
  }

  openContectMenu(coords:Coord){
    this.ContextMenuService.switchContextMenu();
    this.ContextMenuService.changeDisplayOfContextMenu(coords);
  }
}
