import { Component } from '@angular/core';
import { TaskModalService } from '../../Services/task-modal.service';
import { Task } from '../../Models/Task/Task';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss'
})


export class TaskModalComponent {
  isTaskModalOpen:boolean = false;
  constructor(private taskModalService:TaskModalService){}





  taskOpcions = [
    {
      title:"Task Styling",
    },
    {
      title:"Task Styling",
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
  check(){
    console.log("testing")
  }







  ngOnInit(){
    this.taskModalService.taskModal.subscribe((task:Task)=>{
      if(!task) return;
      this.isTaskModalOpen=true;
    })
  }

}
