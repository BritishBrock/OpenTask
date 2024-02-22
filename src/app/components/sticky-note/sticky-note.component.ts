import { Component, ElementRef, Input } from '@angular/core';
import { StickyNote } from '../../Models/stickyNote/stickyNote';
import { DragServiceService } from '../../Services/DragService/drag-service.service';
import { TaskModalService } from '../../Services/task-modal.service';
import { Coord } from '../../interfaces/Coord/Coord';

@Component({
  selector: 'app-sticky-note',
  templateUrl: './sticky-note.component.html',
  styleUrl: './sticky-note.component.scss'
})
export class StickyNoteComponent {
  @Input() stickyNote!:StickyNote;
  nativeElement?:HTMLElement;

  constructor(private elRef:ElementRef,
    private DragService:DragServiceService,
    private taskModalService:TaskModalService
    ) {
    this.nativeElement = this.elRef.nativeElement;
  }

  isHoveringOver:boolean = false;
  isResizing:boolean = false;
  resizingInitalPosition:Coord = {x:0,y:0}

  resizingMouseDown(event:any){
    event.preventDefault()
    this.isResizing = true
    this.resizingInitalPosition = {x:event.x,y:event.y}
    this.taskModalService.TaskModalOpen.next(true)
  }
  resizingMouseUp(event:any){
    event.preventDefault()
    this.isResizing = false
    this.taskModalService.TaskModalOpen.next(false)
  }

  resize(direction:string,event:any){
    event.preventDefault()
    if(  !this.isResizing ) return;
    switch(direction){
      case "left":
        this.nativeElement!.style.width = this.nativeElement!.clientWidth + event.movementX*-1  +"px"
        this.stickyNote.pos.x += event.movementX
        break;
      case "right":
          this.nativeElement!.style.width = this.nativeElement!.clientWidth + (event.movementX)  +"px"
      break;
      case "top":
        this.nativeElement!.style.height = this.nativeElement!.clientHeight + event.movementY*-1  +"px"
        this.stickyNote.pos.y += event.movementY
        break;
      case "bottom":
        this.nativeElement!.style.height = this.nativeElement!.clientHeight + (event.movementY)  +"px"
      break;
    }
    this.nativeElement!.style.left = this.stickyNote.pos.x  +"px";
        this.nativeElement!.style.top =  this.stickyNote.pos.y +"px";
  }
  ngOnInit(){
    if(this.nativeElement) {

      this.nativeElement.addEventListener("mousedown",(event:any)=>{
      })
      this.nativeElement.addEventListener("mouseenter",(event:any)=>{
        this.isHoveringOver = true;
      })

      this.nativeElement.addEventListener("mouseleave",(event:any)=>{
        this.isHoveringOver = false;
      })

    this.nativeElement.addEventListener("mouseup",(event:any)=>{
      this.nativeElement!.style.position = "absolute"
      this.nativeElement!.style.left = this.stickyNote.pos.x  +"px";
      this.nativeElement!.style.top =  this.stickyNote.pos.y +"px";
    
 
      if(this.DragService.Tasks )
      this.DragService.clearSelectedHTMLElement();
      
    })
  }
    
  }

  mousedown(){
    if(!this.nativeElement) return;
    if(this.isResizing) return;
    this.nativeElement.addEventListener("mousedown",(event:any)=>{
      switch (event.which) {
          case 1:
            if(!this.DragService.Tasks){
              this.DragService.selectHTMLElement(this.stickyNote)
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
       this.DragService.selectHTMLElement(this.stickyNote)
      }
    })
  }


  
  ngOnChanges(){
    this.nativeElement!.style.position = "absolute";

    this.nativeElement!.style.left =  this.stickyNote.pos.x +"px";
    this.nativeElement!.style.top = this.stickyNote.pos.y +"px";

    if(this.nativeElement) {
      this.stickyNote.setHtmlElement(this.nativeElement);
      this.mousedown();
     
      
    }
  }

}
