import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Note } from '../../Models/Note/Note';
import { Subject } from 'rxjs';
import { BoardService } from '../../Services/board/board.service';

@Component({
  selector: 'app-notes-viewer',
  templateUrl: './notes-viewer.component.html',
  styleUrl: './notes-viewer.component.scss',
})
export class NotesViewerComponent {
  noteToAdd: string = '';
  notes: Note[] = [];
  noteSelectd: any;
  constructor(private elRef: ElementRef, private changeDetector: ChangeDetectorRef,private globalBoards:BoardService) {}
  htmlElement!: HTMLElement;
  @ViewChild("noteBody") notebody!:ElementRef;
  ngOnInit() {
    this.notes = this.globalBoards.activeBoard!.boardNotes
  }
  globalPos: any;
  dropped  = false;
  pos: any;
  x: any;
  y: any;
  ofPos:any
  noteTitle:string = "";
  noteDesc:string = "";
  pickUpNote(note: any, pos: any) {
    if(this.isNoteCreationActive){
      this.createNote()
    }else{
      this.dropped = false;
      this.ofPos = pos;
      this.noteSelectd = this.notes.splice(pos, 1)[0];
    }
  }

  createNote(){
    if(!this.isNoteCreationActive)return;
    let n = new Note(this.noteTitle)

    n.descripcion = this.noteDesc;
    this.notes.push(n);
    this.noteDesc = "";
    this.noteTitle = "";
    this.isNoteCreationActive = false;
  }
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
  isNoteCreationActive:boolean = false;

  isOnOtherNote(x: any, y: any) {
    let ns = document.getElementById('selected');
    if (!ns) return;
    let list: any = document.getElementsByClassName('list');

    for (let i = 0; i < list.length; i++) {
      if (
        x > list[i].offsetLeft - 25 &&
        x + ns.clientWidth < list[i].offsetLeft + list[i].clientWidth + 25 &&
        y > list[i].offsetTop &&
        y + 10 < list[i].offsetTop + list[i].clientHeight
      )
        return i;
    }

    return null;
  }

  getGridSpan(id:number){
      return "span " + Math.ceil(document.getElementById(id+"")!.getElementsByTagName("pre")[0].clientHeight / 200)
  }


  ngAfterViewInit(){
    this.htmlElement =this.notebody.nativeElement;



    this.htmlElement.addEventListener('mouseup', () => {
      delete this.pos;
      delete this.globalPos;
      if (this.noteSelectd) delete this.noteSelectd;
    });
    this.htmlElement.addEventListener('mousemove', (e: any) => {
      let ns = document.getElementById('selected');
      if (!ns) return;
      ns.style.position = 'absolute';
      ns.style.left = e.x + 'px';
      ns.style.top = e.y + 'px';
      this.pos = this.isOnOtherNote(e.x, e.y);
      if (this.pos != null) {
        if(this.globalPos != null){
       this.notes.splice(this.globalPos ,1); 
       delete this.globalPos
        }
          this.notes.splice(this.pos,0,this.noteSelectd)
          this.globalPos = this.pos;
          s.next(true)
          this.changeDetector.detectChanges();
      }


    });
  }


}



export var s:Subject<boolean> = new Subject<boolean>()