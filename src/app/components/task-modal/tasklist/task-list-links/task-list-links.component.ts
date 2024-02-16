import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskList } from '../../../../Models/TaskList/TaskList';
import { TaskViewerBoardService } from '../../../../Services/taskViewerBoard/task-viewer-board.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-task-list-links',
  templateUrl: './task-list-links.component.html',
  styleUrl: './task-list-links.component.scss'
})
export class TaskListLinksComponent {
  @Input() taskList!:TaskList;
  @Input() event!:Subject<any>;
  bind?:number;
  globalTaskList:TaskList[] = this.taskviewer.globalTaskLists;
  constructor(private taskviewer:TaskViewerBoardService){}
  ngOnInit(){
   
  }


  view(){
    for(let i = 0; i< this.globalTaskList.length;i++){
      if(this.globalTaskList[i].id == this.bind){
        this.taskList.relatesTo = this.globalTaskList[i];
      }
    }
    this.event.next("lol")
  }



}
