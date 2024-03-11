import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Note } from '../../Models/Note/Note';
import { Subject } from 'rxjs';
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
            '0.5s ease',
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
  @ViewChild("noteBody") notebody!:ElementRef;
  ngOnInit() {
    //this.notes = this.globalBoards.activeBoard!.boardNotes;
  }
  
  noteTitle:string = "";
  noteDesc:string = "";
 
  createNote(){
    if(!this.isNoteCreationActive)return;
    let n = new Note(this.noteTitle)

    n.descripcion = this.noteDesc;
    this.notes.splice(Math.floor(Math.random()*this.notes.length),0,n);
    this.noteDesc = "";
    this.noteTitle = "";
    this.isNoteCreationActive = false;
  }
  isNoteCreationActive:boolean = false;
  deleteNote(index:any){
    this.notes.splice(index,1);
  }
}
