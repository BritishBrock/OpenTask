import { Component, Input } from '@angular/core';
import { Task } from '../../../../Models/Task/Task';

@Component({
  selector: 'app-task-styling',
  templateUrl: './task-styling.component.html',
  styleUrl: './task-styling.component.scss'
})
export class TaskStylingComponent {
  @Input() task!:Task;

  cardType(opcion:number){
    this.task.cardColorTagType = opcion;
  }
  
}
