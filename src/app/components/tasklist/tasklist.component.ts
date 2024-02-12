import { Component, ElementRef, Input } from '@angular/core';
import { TaskList } from '../../Models/TaskList/TaskList';
import { DragServiceService } from '../../Services/DragService/drag-service.service';
import { ContextMenuService } from '../../Services/ContextMenu/context-menu.service';
import { Coord } from '../../interfaces/Coord/Coord';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.scss'
})
export class TasklistComponent {
  nativeElement?:HTMLElement;
  @Input() taskList!:TaskList;
  constructor(private elRef:ElementRef,private DragService:DragServiceService,private ContextMenuService:ContextMenuService) {
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
    }
  }


  mousedown(){
    if(!this.nativeElement) return;
    this.nativeElement.addEventListener("mousedown",(event:any)=>{
      switch (event.which) {
          case 1:
            if(this.ContextMenuService._isOpen) this.ContextMenuService.switchContextMenu();
            if(!this.DragService.Tasks){
              this.DragService.selectHTMLElement(this.taskList)
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
