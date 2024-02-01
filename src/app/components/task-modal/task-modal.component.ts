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


  ngOnInit(){
    this.taskModalService.taskModal.subscribe((task:Task)=>{
      if(!task) return;
      this.isTaskModalOpen=true;
      let copy:Task =  Object.assign(Object.create(Object.getPrototypeOf(task)), task)
      delete copy.htmlElement;
      console.log(JSON.stringify(copy))
    })
  }

}
