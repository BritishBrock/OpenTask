import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskList } from '../../../../Models/TaskList/TaskList';
import { TaskViewerBoardService } from '../../../../Services/taskViewerBoard/task-viewer-board.service';
import { Subject } from 'rxjs';
import { DragServiceService } from '../../../../Services/DragService/drag-service.service';
import { Coord } from '../../../../interfaces/Coord/Coord';

@Component({
  selector: 'app-task-list-links',
  templateUrl: './task-list-links.component.html',
  styleUrl: './task-list-links.component.scss'
})
export class TaskListLinksComponent {
  @Input() taskList!:TaskList;
  @Input() event!:Subject<any>;
  bind?:number;
  globalTaskList:TaskList[] = this.taskviewer.globalTaskLists
  constructor(private taskviewer:TaskViewerBoardService,private dragService:DragServiceService){}
  ngOnInit(){
   
  }


  view(){
    for(let i = 0; i< this.globalTaskList.length;i++){
      if(this.globalTaskList[i].id == this.bind){
        this.taskList.relatesTo = this.globalTaskList[i];
      }
    }
    this.taskviewer.taskListUpdateLines.next(true);
  }

  deleteLink(){
    delete this.taskList.relatesTo;
  }
  goTo(pos:Coord){
    this.dragService.goToBoardPosEL( pos);
  }


}
