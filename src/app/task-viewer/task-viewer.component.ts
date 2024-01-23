import { Component, ElementRef } from '@angular/core';
import { FactoryService } from '../Factory/factory.service';
import { Task } from '../Models/Task/Task';
import { DragServiceService } from '../Services/DragService/drag-service.service';
import { Coord } from '../interfaces/Coord/Coord';

@Component({
  selector: 'app-task-viewer',
  templateUrl: './task-viewer.component.html',
  styleUrl: './task-viewer.component.scss'
})
export class TaskViewerComponent {
  tasks:Task[] = [];
  constructor(private FactoryService:FactoryService,private elRef:ElementRef,private dragService:DragServiceService){
    this.elRef.nativeElement.addEventListener("mousemove",(event:any)=>{
      this.dragService.moveSelectedHTMLElement({x:event.x,y:event.y} as Coord);
    })

    this.elRef.nativeElement.addEventListener('contextmenu', (event:any) => {
      event.preventDefault();
  });
  }
  ngOnInit(){
    this.tasks = this.FactoryService.generateTasks(10);
  }

}
