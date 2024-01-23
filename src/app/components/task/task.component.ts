import { Component, ElementRef, Input } from '@angular/core';
import { Task } from '../../Models/Task/Task';
import { DragServiceService } from '../../Services/DragService/drag-service.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input() task!:Task;
  nativeElement?:HTMLElement;
  constructor(private elRef:ElementRef) {
    this.nativeElement = this.elRef.nativeElement;
  }
}
