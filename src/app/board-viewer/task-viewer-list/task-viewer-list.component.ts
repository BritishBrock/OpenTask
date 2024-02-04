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
  }
  ngAfterViewInit(){
    for(let i = 0; this.TaskViewerBoardService.globalTaskLists.length;i++){
      if(this.TaskViewerBoardService.globalTaskLists[i].tasks.length > 0){
        this.tasks.push(...this.TaskViewerBoardService.globalTaskLists[i].tasks)
      }
    }
  }


}
