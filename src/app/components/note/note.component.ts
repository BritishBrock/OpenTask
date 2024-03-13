import { Component, ElementRef, Input } from '@angular/core';
import { Note } from '../../Models/Note/Note';
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponent {
  @Input() note!:Note;
  constructor(private elref:ElementRef){}
  ngOnInit(){

  }

}
