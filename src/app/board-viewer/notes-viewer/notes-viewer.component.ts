import { Component } from '@angular/core';

@Component({
  selector: 'app-notes-viewer',
  templateUrl: './notes-viewer.component.html',
  styleUrl: './notes-viewer.component.scss'
})
export class NotesViewerComponent {

  noteToAdd:string = "";
  notes:string[] = [];
  addNote(){
    this.notes.push(this.noteToAdd)
    this.noteToAdd = "";
  }
  removeNote($index:number){
    this.notes.splice($index,1);
  }
  
}