import { Component, Input } from '@angular/core';
import { Task } from '../../Models/Task/Task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input() task!:Task;
  
}
