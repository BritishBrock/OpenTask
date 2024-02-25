import { Component, Input } from '@angular/core';
import { StickyNote } from '../../../Models/stickyNote/stickyNote';

@Component({
  selector: 'app-stickynote',
  templateUrl: './stickynote.component.html',
  styleUrl: './stickynote.component.scss'
})
export class StickynoteComponent {
  @Input() stickyNote!:StickyNote;
}
