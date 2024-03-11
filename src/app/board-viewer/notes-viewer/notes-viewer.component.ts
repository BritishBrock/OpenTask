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
  
  noteTitle:string = "";
  noteDesc:string = "";
 
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
  deleteNote(index:any){
    this.notes.splice(index,1);
  }
}
