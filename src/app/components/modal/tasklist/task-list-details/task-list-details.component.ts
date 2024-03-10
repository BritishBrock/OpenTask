import { Component, Input } from '@angular/core';
import { TaskList } from '../../../../Models/TaskList/TaskList';

@Component({
  selector: 'app-task-list-details',
  templateUrl: './task-list-details.component.html',
  styleUrl: './task-list-details.component.scss'
})
export class TaskListDetailsComponent {
  @Input() taskList!:TaskList;
  taskVisible:boolean = false;
  deleteTaskFromTasklist(index:number){
    this.taskList.tasks.splice(index,1);
  }
}
