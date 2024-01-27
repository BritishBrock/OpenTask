import { Component, ElementRef } from '@angular/core';
import { FactoryService } from '../Factory/factory.service';
import { Task } from '../Models/Task/Task';
import { DragServiceService } from '../Services/DragService/drag-service.service';
import { Coord } from '../interfaces/Coord/Coord';
import { TaskList } from '../Models/TaskList/TaskList';
import { TaskViewerBoardService } from '../Services/taskViewerBoard/task-viewer-board.service';

@Component({
  selector: 'app-task-viewer',
  templateUrl: './task-viewer.component.html',
  styleUrl: './task-viewer.component.scss'
})
export class TaskViewerComponent {
  tasks:Task[] = this.taskviewerService.globalTasks;
  taskList:TaskList =this.taskviewerService.globalTaskLists[0];
  constructor(private FactoryService:FactoryService,private elRef:ElementRef,private dragService:DragServiceService,private taskviewerService:TaskViewerBoardService){
    this.elRef.nativeElement.addEventListener("mousemove",(event:any)=>{
      if(!this.dragService.Tasks)return;
      this.dragService.moveSelectedHTMLElement({x:event.x,y:event.y} as Coord);
    })

    this.elRef.nativeElement.addEventListener('contextmenu', (event:any) => {
      event.preventDefault();
  });
  }
  ngOnInit(){
   
    
  }

}
