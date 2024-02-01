import { Component, ElementRef, Input } from '@angular/core';
import { Task } from '../../Models/Task/Task';
import { DragServiceService } from '../../Services/DragService/drag-service.service';
import { ContextMenuService } from '../../Services/ContextMenu/context-menu.service';
import { Coord } from '../../interfaces/Coord/Coord';
import { TaskModalService } from '../../Services/task-modal.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input() task!:Task;
  nativeElement?:HTMLElement;

  isTaskModalOpen:boolean = false;


  constructor(private elRef:ElementRef,
    private DragService:DragServiceService,
    private ContextMenuService:ContextMenuService,
    private taskModalService:TaskModalService
    ) {
    this.nativeElement = this.elRef.nativeElement;
  }
  ngOnInit(){
    
    
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
    // this.ContextMenuService.switchContextMenu();
    // this.ContextMenuService.changeDisplayOfContextMenu(coords);
  }



  openTaskModal(){
    this.taskModalService.taskModal.next(this.task);
  }











  ngOnChanges(){
    if(this.task.isInTaskList){
      this.nativeElement!.style.position = "relative"
      this.nativeElement!.style.left = "0";
      this.nativeElement!.style.top = "0";
    }else{
      this.nativeElement!.style.position = "absolute"
      this.nativeElement!.style.left = this.task.pos.x +"px";
      this.nativeElement!.style.top = this.task.pos.y +"px";
    }

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

}
