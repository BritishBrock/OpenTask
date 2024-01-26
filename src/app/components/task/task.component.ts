import { Component, ElementRef, Input } from '@angular/core';
import { Task } from '../../Models/Task/Task';
import { DragServiceService } from '../../Services/DragService/drag-service.service';
import { ContextMenuService } from '../../Services/ContextMenu/context-menu.service';
import { Coord } from '../../interfaces/Coord/Coord';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input() task!:Task;
  nativeElement?:HTMLElement;
  constructor(private elRef:ElementRef,private DragService:DragServiceService,private ContextMenuService:ContextMenuService) {
    this.nativeElement = this.elRef.nativeElement;
  }
  ngOnInit(){

    if(this.nativeElement) {
      this.task.setHtmlElement(this.nativeElement);
      this.mousedown();
     
      this.nativeElement.addEventListener("mouseup",(event:any)=>{
        if(this.DragService.Tasks)
        this.DragService.getPlaceOfDropped();
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
            if(!this.DragService.Tasks){
              this.DragService.selectHTMLElement(this.task)
            };
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
