import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.scss'
})
export class TasklistComponent {
  nativeElement?:HTMLElement;
  constructor(private elRef:ElementRef) {
    this.nativeElement = this.elRef.nativeElement;
  }
 
}
