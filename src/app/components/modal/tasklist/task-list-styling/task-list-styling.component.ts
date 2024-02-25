import { Component, Input } from '@angular/core';
import { TaskList } from '../../../../Models/TaskList/TaskList';

@Component({
  selector: 'app-task-list-styling',
  templateUrl: './task-list-styling.component.html',
  styleUrl: './task-list-styling.component.scss'
})
export class TaskListStylingComponent {
  @Input() taskList!:TaskList;

}
