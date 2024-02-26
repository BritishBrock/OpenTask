import { Component, ElementRef, Input } from '@angular/core';
import { TaskList } from '../../Models/TaskList/TaskList';
import { DragServiceService } from '../../Services/DragService/drag-service.service';
import { ContextMenuService } from '../../Services/ContextMenu/context-menu.service';
import { Coord } from '../../interfaces/Coord/Coord';
import { TaskModalService } from '../../Services/task-modal.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.scss'
})
export class TasklistComponent {
  nativeElement?:HTMLElement;
  @Input() taskList!:TaskList;
  constructor(private elRef:ElementRef,private DragService:DragServiceService,private ContextMenuService:ContextMenuService,private taskModalService:TaskModalService) {
    this.nativeElement = this.elRef.nativeElement;
  }
  ngOnInit(){
    
    if(this.nativeElement) {
      this.taskList.setHtmlElement(this.nativeElement);
      this.mousedown();
     
      this.nativeElement.addEventListener("mouseup",(event:any)=>{
       
        this.nativeElement!.style.position = "absolute"
        this.nativeElement!.style.left = this.taskList.pos.x  +"px";
        this.nativeElement!.style.top =  this.taskList.pos.y +"px";
        
    
  
   
        if(this.DragService.Tasks)
        this.DragService.clearSelectedHTMLElement();
        
      })
      this.nativeElement!.addEventListener("touchend",(event:any)=>{
        this.nativeElement!.style.position = "absolute"
        this.nativeElement!.style.left = this.taskList.pos.x  +"px";
        this.nativeElement!.style.top =  this.taskList.pos.y +"px";
      
   
        if(this.DragService.Tasks)
        this.DragService.clearSelectedHTMLElement();
  
  
      })
    }
  }

  doubleClick(){
    this.taskModalService.taskListModal.next(this.taskList);
  }
  mousedown(){
    if(!this.nativeElement) return;
    this.nativeElement.addEventListener("mousedown",(event:any)=>{
      switch (event.which) {
          case 1:
            if(!this.DragService.Tasks && !this.taskList.isLocked){
              this.DragService.selectHTMLElement(this.taskList)
            };
          break;
          case 2: break;
          case 3:
           
          break;
      }
    })
    this.nativeElement.addEventListener("touchstart",(event:any)=>{
      event.preventDefault();
    
            if(!this.DragService.Tasks){
       this.DragService.selectHTMLElement(this.taskList)
      }
    })
  }



  ngOnChanges(){

      this.nativeElement!.style.position = "absolute"
      this.nativeElement!.style.left = this.taskList.pos.x +"px";
      this.nativeElement!.style.top = this.taskList.pos.y +"px";

    if(this.nativeElement) {
      this.taskList.setHtmlElement(this.nativeElement);
      this.mousedown();
    }
  }


}
