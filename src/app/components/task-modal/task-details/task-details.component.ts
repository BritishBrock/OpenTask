import { Component, Input } from '@angular/core';
import { Task } from '../../../Models/Task/Task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent {
  @Input() task!:Task;

}
