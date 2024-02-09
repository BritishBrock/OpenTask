import { Component, ElementRef } from '@angular/core';
import { DragServiceService } from '../../Services/DragService/drag-service.service';
import { TaskViewerBoardService } from '../../Services/taskViewerBoard/task-viewer-board.service';
import { TaskList } from '../../Models/TaskList/TaskList';
import { Task } from '../../Models/Task/Task';

@Component({
  selector: 'app-simple-viewer',
  templateUrl: './simple-viewer.component.html',
  styleUrl: './simple-viewer.component.scss'
})
export class SimpleViewerComponent {

  constructor(private elRef:ElementRef,private dragService:DragServiceService,private taskviewerService:TaskViewerBoardService){}
  tasks:Task[] =[]
  taskLists:TaskList[] = [];

ngOnInit(){
  this.tasks =  this.taskviewerService.globalTasks;
  this.taskLists =  this.taskviewerService.globalTaskLists;
}

}
