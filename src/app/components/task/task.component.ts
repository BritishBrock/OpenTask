import { Component, ElementRef, Input } from '@angular/core';
import { Task } from '../../Models/Task/Task';
import { DragServiceService } from '../../Services/DragService/drag-service.service';
import { ContextMenuService } from '../../Services/ContextMenu/context-menu.service';
import { Coord } from '../../interfaces/Coord/Coord';
import { TaskModalService } from '../../Services/task-modal.service';
import { TaskViewerBoardService } from '../../Services/taskViewerBoard/task-viewer-board.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input() task!:Task;
  @Input() isInModal?:boolean;
  nativeElement?:HTMLElement;

  isTaskModalOpen:boolean = false;


  constructor(private elRef:ElementRef,
    private DragService:DragServiceService,
    private ContextMenuService:ContextMenuService,
    private taskModalService:TaskModalService,
    private taskViewerService:TaskViewerBoardService,
    ) {
    this.nativeElement = this.elRef.nativeElement;
  }
  ngOnInit(){



    




    if(this.isInModal) return;
    this.nativeElement!.addEventListener("mouseup",(event:any)=>{
      this.nativeElement!.style.position = "absolute"
      this.nativeElement!.style.left =+ this.task.pos.x+"px";
      this.nativeElement!.style.top = +this.task.pos.y  +"px";
      if(this.task.isInTaskList){
        this.nativeElement!.style.position = "relative"
        this.nativeElement!.style.left = "0";
        this.nativeElement!.style.top = "0";
        this.nativeElement!.style.zIndex = "0";
      }
      
      if(this.DragService.Tasks )
      this.DragService.getPlaceOfDropped();
      this.DragService.clearSelectedHTMLElement();


    })
    this.nativeElement!.addEventListener("touchend",(event:any)=>{
      this.nativeElement!.style.position = "absolute"
      this.nativeElement!.style.left =+ this.task.pos.x+"px";
      this.nativeElement!.style.top = +this.task.pos.y  +"px";
      if(this.task.isInTaskList){
        this.nativeElement!.style.position = "relative"
        this.nativeElement!.style.left = "0";
        this.nativeElement!.style.top = "0";
        this.nativeElement!.style.zIndex = "0";
      }
     
      if(this.DragService.Tasks)
      this.DragService.getPlaceOfDropped();
      this.DragService.clearSelectedHTMLElement();


    })
    
  }


  mousedown(){
    this.nativeElement!.addEventListener("touchstart",(event:any)=>{
      event.preventDefault();
            if(!this.DragService.Tasks){
       this.DragService.selectHTMLElement(this.task)
      }
    })
  }




  openTaskModal(){
    this.taskModalService.taskModal.next(this.task);
  }



  ngAfterViewInit(){
    this.nativeElement!.addEventListener("mousedown",(event:any)=>{
      switch (event.which) {
          case 1:
            if(this.ContextMenuService._isOpen) this.ContextMenuService.switchContextMenu();
            if(!this.DragService.Tasks){
            
              if(this.task.taskListId != undefined){
               
                let tasklists = this.taskViewerService.globalTaskLists;
                for(let i = 0; i < tasklists.length;i++){
                  if(tasklists[i].id == this.task.taskListId ){
                 
                    this.task.pos = {
                      x:this.taskViewerService.getFromGlobalTasksList(this.task.taskListId)!.pos.x + this.task.htmlElement!.offsetLeft,
                      y:this.taskViewerService.getFromGlobalTasksList(this.task.taskListId)!.pos.y+ this.task.htmlElement!.offsetTop
                    }
                   
                    tasklists[i].removeFromList(this.task.id);
                    this.task.removeTaskListId();
                    this.taskViewerService.addToGlobalTasks(this.task);

                  }
                }
              
              }
            
              this.DragService.selectHTMLElement(this.task)
            };
          break;
          case 2: break;
          case 3:
          break;
      }
    })
  }






  ngOnChanges(){
    this.nativeElement!.style.position = "absolute";

    this.nativeElement!.style.left =  this.task.pos.x +"px";
    this.nativeElement!.style.top = this.task.pos.y +"px";
  
    if(this.task.isInTaskList ||this.isInModal){
      this.nativeElement!.style.position = "relative"
      this.nativeElement!.style.left = "0";
      this.nativeElement!.style.top = "0";
      this.nativeElement!.style.zIndex = "0";
    }
    
    if(this.nativeElement && !this.isInModal) {

      this.task.setHtmlElement(this.nativeElement);

      this.mousedown();
    }

  }

}
