import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Note } from '../../Models/Note/Note';
import { Subject, first } from 'rxjs';
import { BoardService } from '../../Services/board/board.service';
import {
  style,
  animate,
  trigger,
  transition,
  group,
  state,
  sequence,
} from '@angular/animations';
@Component({
  selector: 'app-notes-viewer',
  templateUrl: './notes-viewer.component.html',
  styleUrl: './notes-viewer.component.scss',
  animations: [
    trigger('anim', [
      
      transition(':enter', [
        style({
          height: '0',
          overflow: 'hidden',
          opacity: '1',
          'box-shadow': '0 1px 4px 0 rgba(0, 0, 0, 0.3)',
        }),
        sequence([
          animate(
            '0.5s ease-in-out',
            style({
              height: '*',
              opacity: 1,

              'box-shadow': 'none',
            })
          ),
        ]),
      ]),
      transition(':leave', [
        style({
          height: '*',
          opacity: '0',
          transform: 'translateX(20px)',
          'box-shadow': 'none',
        }),
        sequence([
          animate(
            '1s ease',
            style({
              height: '0',
              opacity: '0',
              transform: 'translateX(20px)',
              'box-shadow': 'none',
            })
          ),
        ]),
      ]),
    ]),
  ],
})
export class NotesViewerComponent {
  noteToAdd: string = '';
  notes: Note[] = [];
  noteSelectd: any;
  constructor(private elRef: ElementRef, private changeDetector: ChangeDetectorRef,private globalBoards:BoardService) {}
  htmlElement!: HTMLElement;

  x:any;

pos:any = {x:0,y:0}

  @ViewChild("noteBody") notebody!:ElementRef;
  ngOnInit() {
    this.globalBoards.boardUpdates.subscribe(() => {
    this.notes = this.globalBoards.activeBoard!.boardNotes;
    })
    this.htmlElement = this.elRef.nativeElement;
    this.htmlElement.addEventListener("mousemove",(event:any)=>{
      
      if(!this.noteGrabbed)return;

      document.getElementById("copy")!.style.position ="absolute";
      document.getElementById("copy")!.style.left =event.x -   (document.getElementById("copy")!.clientWidth/2) +"px";
      document.getElementById("copy")!.style.top =event.y - 10 +"px";
      if( event.x  > this.pos.x +100  || event.x < this.pos.x -100 
        ||  event.y  > this.pos.y +100  || event.y < this.pos.y -100 
        ){
          for(let i = 0; i < this.notes.length;i++){
            if(this.notes[i].id == this.noteGrabbed.id){
              this.notes.splice(i,1)
            }
          }

          if( event.y > document.getElementById(this.notes[this.notes.length-1].id+"")!.offsetTop +document.getElementById(this.notes[this.notes.length-1].id+"")!.clientHeight ){
            if(this.x)clearInterval(this.x)
            this.x = setTimeout(()=>{
              this.notes.push(this.noteGrabbed);
              this.pos.x = event.x;
              this.pos.y = event.y;
              clearInterval(this.x);
            },300) 
          }
          for(let i = 0; i < this.notes.length;i++){
            if(
               event.x > document.getElementById(this.notes[i].id+"")!.offsetLeft &&
               event.x < document.getElementById(this.notes[i].id+"")!.offsetLeft +document.getElementById(this.notes[i].id+"")!.clientWidth &&
               event.y > document.getElementById(this.notes[i].id+"")!.offsetTop &&
               event.y < document.getElementById(this.notes[i].id+"")!.offsetTop +document.getElementById(this.notes[i].id+"")!.clientHeight 
               ){
                if(this.x)clearInterval(this.x)
                this.x = setTimeout(()=>{
                  this.notes.splice(i,0,this.noteGrabbed);
                  this.pos.x = event.x;
                  this.pos.y = event.y;
                  clearInterval(this.x);
                },300) 
              }
          }


      }
     
    })
    
    this.htmlElement.addEventListener("mouseup",(event:any)=>{
      if(!this.noteGrabbed) return;
      delete this.noteGrabbed;
    })
    this.htmlElement.addEventListener("touchstart",(event:any)=>{
     
   
      if(this.isFirstTouch){this.count++;}
      if(this.count > 1 ){
        this.isFirstTouch = false;
        this.count = 0;
        if(this.noteSwitch && !this.isFirstTouch){
          document.getElementById(this.noteSwitch.id)!.style.border = "none";
         
          delete this.notePos;
       delete this.noteSwitch;
  
        }
      }

     
 

    })
  }
  count =0;
  noteTitle:string = "";
  noteDesc:string = "";
  isFirstTouch:any =true;
  createNote(){
    if(!this.isNoteCreationActive)return;
    let n = new Note(this.noteTitle)

    n.descripcion = this.noteDesc;
    this.notes.push(n);
    this.noteDesc = "";
    this.noteTitle = "";
    this.isNoteCreationActive = false;
  }
  isNoteCreationActive:boolean = false;
  deleteNote(index:any,event:any){
    event.preventDefault()
    this.notes.splice(index,1);
  }
  noteGrabbed:any;
  prevPosition:number = 0;
  grabNote(note:any,index:number,event:any){
   this.noteGrabbed = note;
   this.prevPosition = index;
   this.notes.splice(index,1)
   document.getElementById("copy")!.style.position ="absolute";
   document.getElementById("copy")!.style.left =event.x -   (document.getElementById("copy")!.clientWidth/2) +"px";
   document.getElementById("copy")!.style.top =event.y -10+"px";
  }
  switchStart(note:any,index:number,event:any){
      event.preventDefault()
      if(!this.noteSwitch){
        document.getElementById(note.id)!.style.border = "5px solid blue";
        this.noteSwitch = note;
        this.notePos = index;
        this.isFirstTouch = true;
      }else{
  
        
  
  
  
          // this.notes.splice(index,1)
          // this.notes.splice(this.notePos,1)
  
          // this.notes.splice(index,0,this.noteSwitch)
          // this.notes.splice(this.notePos,0,note)
          this.notes[index]= this.noteSwitch;
          this.notes[this.notePos]= note;
          document.getElementById(this.noteSwitch.id)!.style.border = "none";
       delete this.notePos;
       delete this.noteSwitch;
      }
    
  }
  notePos:any;
  noteSwitch:any;
}
