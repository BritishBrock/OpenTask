import { Component } from '@angular/core';
import { TaskModalService } from '../../Services/task-modal.service';
import { Task } from '../../Models/Task/Task';
import { TaskStylingComponent } from './task-styling/task-styling.component';
import { TaskDetailsComponent } from './task-details/task-details.component';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss'
})


export class TaskModalComponent {
  isTaskModalOpen:boolean = false;
  task?:Task;
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
      title:"Task Styling",
    },
    {
      title:"Task Styling"
    },
    {
      title:"Task Styling"
    },
    {
      title:"Task Styling"
    },
  ]






  ngOnInit(){

    this.taskModalService.taskModal.subscribe((task:Task)=>{
      if(!task) return;
      this.task = task;
      this.component = TaskDetailsComponent;
      this.isTaskModalOpen=true;
    })
  }

}
