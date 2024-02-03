import { Component, Input } from '@angular/core';
import { Task } from '../../../Models/Task/Task';

@Component({
  selector: 'app-task-colors',
  templateUrl: './task-colors.component.html',
  styleUrl: './task-colors.component.scss'
})
export class TaskColorsComponent {
  @Input() task!:Task;

  cardType(opcion:number){
    this.task.cardColorTagType = opcion;
  }
}
