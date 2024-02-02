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
  select:HTMLElement= document.createElement("div");
  isselect = false;
  iSX = 0;
  iSY = 0;
  constructor(private FactoryService:FactoryService,private elRef:ElementRef,private dragService:DragServiceService,private taskviewerService:TaskViewerBoardService){
    this.elRef.nativeElement.addEventListener("mousemove",(event:any)=>{
      if(this.dragService.Tasks)
      this.dragService.moveSelectedHTMLElement({x:event.x,y:event.y} as Coord);
    else if(this.isselect){
      let width =  Math.abs(this.iSX - event.x)
      let height =   Math.abs(this.iSY - event.y)

      this.select.style.width = width +"px";
      this.select.style.height = height +"px";
      this.select.style.left = this.iSX +"px";
      this.select.style.top = this.iSY +"px";
      this.select.style.position ="absolute";
      this.select.style.border = " 1px dashed blue";

    }
    })

  //   this.elRef.nativeElement.addEventListener('contextmenu', (event:any) => {
  //     event.preventDefault();
  // });
  }
  ngOnInit(){

    this.select.classList.add("selector");
    this.elRef.nativeElement.addEventListener("mousedown",(event:any)=>{
      
      if(this.dragService.Tasks) return;
      this.isselect = true;
      this.iSX = event.x;
      this.iSY = event.y;
      this.elRef.nativeElement.append(this.select)
    })
    this.elRef.nativeElement.addEventListener("mouseup",(event:any)=>{
      
      if(this.dragService.Tasks) return;
      this.isselect = false;
    })
  }

}
