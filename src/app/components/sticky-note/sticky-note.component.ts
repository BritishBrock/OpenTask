import { Component, ElementRef, Input } from '@angular/core';
import { StickyNote } from '../../Models/stickyNote/stickyNote';
import { DragServiceService } from '../../Services/DragService/drag-service.service';
import { TaskModalService } from '../../Services/task-modal.service';

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
  ngOnInit(){
    if(this.nativeElement) {
    this.nativeElement.addEventListener("mouseup",(event:any)=>{
       
      this.nativeElement!.style.position = "absolute"
      this.nativeElement!.style.left = this.stickyNote.pos.x  +"px";
      this.nativeElement!.style.top =  this.stickyNote.pos.y +"px";
    
 
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
