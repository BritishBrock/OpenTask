import { Component } from '@angular/core';
import { TaskViewerBoardService } from '../../Services/taskViewerBoard/task-viewer-board.service';
import { Task } from '../../Models/Task/Task';

@Component({
  selector: 'app-task-viewer-list',
  templateUrl: './task-viewer-list.component.html',
  styleUrl: './task-viewer-list.component.scss'
})
export class TaskViewerListComponent {
  
  constructor(private TaskViewerBoardService:TaskViewerBoardService){}
  tasks:Task[]= []
  ngOnInit(){
    this.tasks = [...this.TaskViewerBoardService.globalTasks];

    for(let i = 0;i < this.TaskViewerBoardService.globalTaskLists.length;i++){
      for(let y = 0; y < this.TaskViewerBoardService.globalTaskLists[i].tasks.length;y++){
        this.tasks.push(this.TaskViewerBoardService.globalTaskLists[i].tasks[y])
      }
    }  

  }

}
