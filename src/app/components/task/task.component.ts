import { Component, ElementRef, Input } from '@angular/core';
import { Task } from '../../Models/Task/Task';
import { DragServiceService } from '../../Services/DragService/drag-service.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input() task!:Task;

  constructor(private elRef:ElementRef,private DragService:DragServiceService) {
    this.elRef.nativeElement.addEventListener("mousedown",(event:any)=>{
      if(!this.DragService.htmlElementSelected)
      this.DragService.selectHTMLElement(this.elRef);
    })
    this.elRef.nativeElement.addEventListener("mouseup",(event:any)=>{
      if(this.DragService.htmlElementSelected)
      this.DragService.clearSelectedHTMLElement();
    })
    
  }



}
