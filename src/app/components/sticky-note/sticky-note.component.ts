import { Component, ElementRef, Input } from '@angular/core';
import { StickyNote } from '../../Models/stickyNote/stickyNote';
import { DragServiceService } from '../../Services/DragService/drag-service.service';
import { TaskModalService } from '../../Services/task-modal.service';
import { Coord } from '../../interfaces/Coord/Coord';
import { detectDoubleTapClosure } from '../../event/customEvents/doubleTapEvent';

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
  direction:string = "";
  resizingMouseDown(event:any,direction:string){
    event.preventDefault()
    this.direction = direction;
    this.isResizing = true
    this.taskModalService.TaskModalOpen.next(true)
    let main = document.getElementById("resizeMain");
    
    main!.style.display = "block";
    main!.style.width = "100%";
    main!.style.height= "100%";
    main!.style.position= "fixed";
    main!.style.left = "0px";
    main!.style.top = "0px";
    
  }
  resizingMouseUp(event:any){
    event.preventDefault()
    this.isResizing = false;
    this.direction ="";
    this.taskModalService.TaskModalOpen.next(false)
    let main = document.getElementById("resizeMain");
    main!.style.display ="none"
  }

  resize(event:any){
    event.preventDefault()
    if(  !this.isResizing ) return;
    switch(this.direction){
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
  resizeMouseLeave(event:any){
    //this.isResizing =false;
  }

  ngOnInit(){
    if(!this.nativeElement) return;

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

    if(this.stickyNote){
      this.nativeElement!.addEventListener("touchend",(event:any)=>{
        this.lastTap = detectDoubleTapClosure(this.lastTap,this.taskModalService.stickyNoteModal,this.stickyNote)
      })
    }

    this.nativeElement!.addEventListener("touchstart",(event:any)=>{
      event.preventDefault();
      if(!this.DragService.Tasks) this.DragService.selectHTMLElement(this.stickyNote)
    })

  
  
    
  }
  lastTap = 0;


  openStickyNoteModal(){
    this.taskModalService.stickyNoteModal.next(this.stickyNote)
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
