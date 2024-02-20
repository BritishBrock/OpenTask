import { Component } from '@angular/core';
import { TaskModalService } from '../../Services/task-modal.service';
import { Task } from '../../Models/Task/Task';
import { TaskStylingComponent } from './task/task-styling/task-styling.component';
import { TaskDetailsComponent } from './task/task-details/task-details.component';
import { TaskColorsComponent } from './task/task-colors/task-colors.component';
import { TaskDateComponent } from './task/task-date/task-date.component';
import { TaskList } from '../../Models/TaskList/TaskList';
import { TaskListDetailsComponent } from './tasklist/task-list-details/task-list-details.component';
import { TaskListLinksComponent } from './tasklist/task-list-links/task-list-links.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss'
})


export class TaskModalComponent {
  isTaskModalOpen:boolean = false;

  task?:Task;
  taskList?:TaskList;
  constructor(private taskModalService:TaskModalService){}



  component?:any;
  taklistcomponent?:any;
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

  closeModal(){
    this.isTaskModalOpen = false
    this.taskModalService.TaskModalOpen.next(false)
  }

  taskListOpcions = [
    {
      title:"Tasklist Details",
      onclick:()=>{
        this.taklistcomponent = TaskListDetailsComponent;
      }
    },
    {
      title:"Tasklist Links",
      onclick:()=>{
        this.input = {taskList:this.taskList, event:this.event};
        this.taklistcomponent = TaskListLinksComponent;
      }
    },
  ]

  event:Subject<any> = new Subject<any>()
  input:any;
  ngOnInit(){

    this.event.subscribe((event:any)=>{
        if(event.function == "goTo"){
          this.taskModalService.TaskModalOpen.next(false)
        }
    })


    this.taskModalService.taskModal.subscribe((task:Task)=>{
      if(!task) return;
      delete this.taskList;
      this.task = task;
      this.input = {task:this.task};
      this.component = TaskDetailsComponent;
      this.isTaskModalOpen=true;
      this.taskModalService.TaskModalOpen.next(true)
    })

    this.taskModalService.taskListModal.subscribe((taskList:TaskList)=>{
      if(!taskList) return;
      delete this.task;
      this.taskList = taskList;
      this.taklistcomponent = TaskListDetailsComponent;
      this.input = {taskList:this.taskList};
      this.isTaskModalOpen=true;
      this.taskModalService.TaskModalOpen.next(true)
    })
  }




 


}
