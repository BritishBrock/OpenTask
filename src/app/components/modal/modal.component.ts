import { Component } from '@angular/core';
import { TaskModalService } from '../../Services/task-modal.service';
import { Task } from '../../Models/Task/Task';
import { TaskStylingComponent } from './task/task-styling/task-styling.component';
import { TaskDetailsComponent } from './task/task-details/task-details.component';
import { TaskDateComponent } from './task/task-date/task-date.component';
import { TaskList } from '../../Models/TaskList/TaskList';
import { TaskListDetailsComponent } from './tasklist/task-list-details/task-list-details.component';
import { TaskListLinksComponent } from './tasklist/task-list-links/task-list-links.component';
import { Subject } from 'rxjs';
import { TaskListStylingComponent } from './tasklist/task-list-styling/task-list-styling.component';
import { StickyNote } from '../../Models/stickyNote/stickyNote';
import { StickynoteComponent } from './stickynote/stickynote.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})


export class TaskModalComponent {
  isTaskModalOpen:boolean = false;

  task?:Task;
  taskList?:TaskList;
  stickyNote?:StickyNote;
  modalOpen:string = "";
  constructor(private taskModalService:TaskModalService){}



  component?:any;
  taklistcomponent?:any;
  stickyNoteComponent?:any;
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
    {
      title:"Tasklist Styling",
      onclick:()=>{
        this.input;
        this.taklistcomponent = TaskListStylingComponent;
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
      this.modalOpen = "task"
      this.task = task;
      this.input = {task:this.task};
      this.component = TaskDetailsComponent;
      this.isTaskModalOpen=true;
      this.taskModalService.TaskModalOpen.next(true)
    })

    this.taskModalService.taskListModal.subscribe((taskList:TaskList)=>{
      if(!taskList) return;
      this.modalOpen = "taskList"
      this.taskList = taskList;
      this.taklistcomponent = TaskListDetailsComponent;
      this.input = {taskList:this.taskList};
      this.isTaskModalOpen=true;
      this.taskModalService.TaskModalOpen.next(true)
    })
    this.taskModalService.stickyNoteModal.subscribe((stickyNote:StickyNote)=>{
      if(!stickyNote) return;
      this.modalOpen = "stickyNote"
      this.stickyNote = stickyNote;
      this.stickyNoteComponent = StickynoteComponent;
      this.input = {stickyNote:this.stickyNote};
      this.isTaskModalOpen=true;
      this.taskModalService.TaskModalOpen.next(true)
    })
  }




 


}
