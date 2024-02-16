import { Component, Input } from '@angular/core';
import { Task } from '../../../../Models/Task/Task';

@Component({
  selector: 'app-task-date',
  templateUrl: './task-date.component.html',
  styleUrl: './task-date.component.scss'
})
export class TaskDateComponent {
    @Input() task!:Task;
}
