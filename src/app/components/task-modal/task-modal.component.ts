import { Component } from '@angular/core';
import { TaskModalService } from '../../Services/task-modal.service';
import { Task } from '../../Models/Task/Task';
import { TaskStylingComponent } from './task-styling/task-styling.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskColorsComponent } from './task-colors/task-colors.component';
import { TaskDateComponent } from './task-date/task-date.component';
import { TaskList } from '../../Models/TaskList/TaskList';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss'
})


export class TaskModalComponent {
  isTaskModalOpen:boolean = false;
  task?:Task;
  isTaskListModalOpen:boolean = false;
  taskList?:TaskList;
  constructor(private taskModalService:TaskModalService){}



  component?:any;

  taskOpcions = [
    {
      title:"Task Details",
      onclick:()=>{
        this.component = TaskDetailsComponent;
      }
    },
    {
      title:"Task Styling",
      onclick:()=>{
        this.component = TaskStylingComponent;
      }
    },
    {
      title:"Task Colors",
      onclick:()=>{
        this.component = TaskColorsComponent;
      }
    },
    {
      title:"Task Date",
      onclick:()=>{
        this.component = TaskDateComponent;
      }
    },
  ]






  ngOnInit(){

    this.taskModalService.taskModal.subscribe((task:Task)=>{
      if(!task) return;
      this.task = task;
      this.component = TaskDetailsComponent;
      this.isTaskModalOpen=true;
    })

    this.taskModalService.taskListModal.subscribe((taskList:TaskList)=>{
      if(!taskList) return;
      this.taskList = taskList;
      this.isTaskModalOpen=true;
    })
  }




 


}
