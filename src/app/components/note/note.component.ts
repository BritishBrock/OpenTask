import { Component, ElementRef, Input } from '@angular/core';
import { Note } from '../../Models/Note/Note';
import { s } from '../../board-viewer/notes-viewer/notes-viewer.component';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponent {
  @Input() note!:Note;
  constructor(private elref:ElementRef){}
  ngOnInit(){
    s.subscribe(()=>{
      let html:HTMLElement = this.elref.nativeElement;
      console.log(this.note.span)
      html.style.gridRow = this.note.span +"";

    })
  }
  ngAfterViewInit(){
    console.log("f")
    let html:HTMLElement = this.elref.nativeElement;
    html.style.gridRow = "span "+ Math.ceil((html.clientHeight-10)/200)
    this.note.span = "span "+ Math.ceil((html.clientHeight-10)/200);
  }
}
