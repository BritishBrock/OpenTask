import { Component, ElementRef } from '@angular/core';
import { FactoryService } from '../../Factory/factory.service';
import { Task } from '../../Models/Task/Task';
import { DragServiceService } from '../../Services/DragService/drag-service.service';
import { Coord } from '../../interfaces/Coord/Coord';
import { TaskList } from '../../Models/TaskList/TaskList';
import { TaskViewerBoardService } from '../../Services/taskViewerBoard/task-viewer-board.service';

@Component({
  selector: 'app-task-viewer',
  templateUrl: './task-viewer.component.html',
  styleUrl: './task-viewer.component.scss'
})
export class TaskViewerComponent {
  tasks:Task[] = this.taskviewerService.globalTasks;
  taskList:TaskList = this.taskviewerService.globalTaskLists[0];
  select:HTMLElement= document.createElement("div");
  htmlElement!:HTMLElement;
  isselect = false;
  iSX = 0;
  iSY = 0;

  iMX = 0;
  iMY = 0;
  mouseDown = false;
  isMoving:boolean = false;
  constructor(private FactoryService:FactoryService,private elRef:ElementRef,private dragService:DragServiceService,private taskviewerService:TaskViewerBoardService){
    

  //   this.elRef.nativeElement.addEventListener('contextmenu', (event:any) => {
  //     event.preventDefault();
  // });
  }
  ngOnInit(){
    this.htmlElement = this.elRef.nativeElement;
    //set view in the center

    this.htmlElement.style.left = 0 + "px";
    this.htmlElement.style.top = -0+ "px";


    window.addEventListener("keydown",(event)=>{
    
      if(event.key == " ")this.isMoving = true;
    })
    window.addEventListener("keyup",(event)=>{
      if(event.key == " ")this.isMoving = false;
    })
    window.addEventListener("wheel",(event)=>{
     if(event.deltaY == -100){
      this.zoomIn()
     }else if(event.deltaY == 100){
      this.zoomOut();
     }
    })

    this.select.classList.add("selector");
    this.elRef.nativeElement.addEventListener("mousedown",(event:any)=>{
      
      if(this.dragService.Tasks) return;



      if(!this.isMoving){
        this.isselect = true;
        this.iSX = event.x;
        this.iSY = event.y;
        this.elRef.nativeElement.append(this.select)
      }else{
      this.iMX = event.x;
      this.iMY = event.y;
      this.mouseDown = true;
      }
      



    })

    this.elRef.nativeElement.addEventListener("mousemove",(event:any)=>{
      if(this.dragService.Tasks)
      this.dragService.moveSelectedHTMLElement({x:event.x,y:event.y} as Coord);
    else if(this.isselect){
      console.log("f")
      let width =  Math.abs(this.iSX - event.x)
      let height =   Math.abs(this.iSY - event.y)
      this.select.style.width = width +"px";
      this.select.style.height = height +"px";
      this.select.style.left =   Math.abs(parseInt(this.htmlElement.style.left))+ this.iSX +"px";
      this.select.style.top = this.iSY +"px";
      this.select.style.position ="absolute";
      this.select.style.border = " 1px dashed blue";
    } else if(this.isMoving && this.mouseDown  ){     
      console.log((( (this.iMY - event.y)  - ((this.iMY - event.y) *2)  )/100)  )
      this.htmlElement.style.left =   parseInt(this.htmlElement.style.left)  +   (( (this.iMX - event.x)  - ((this.iMX - event.x) *2)  )/100) +"px";
      this.htmlElement.style.top =  parseInt(this.htmlElement.style.top)  +   (( (this.iMY - event.y)  - ((this.iMY - event.y) *2)  )/100) +"px";
    }
    })


    this.elRef.nativeElement.addEventListener("mouseup",(event:any)=>{
      console.log("off")
      this.iMX = 0;
      this. iMY = 0;
      this.mouseDown = false;
      this.isMoving  = false;
      if(this.dragService.Tasks) return;
      this.isselect = false;
    })
  }


  zoom:number = 1;
  zoomIn(){
    // this.zoom += 0.1;
    // this.htmlElement.style.scale = this.zoom+"";
  }

  zoomOut(){
    // this.zoom -= 0.1;
    // this.htmlElement.style.scale = this.zoom+"" ;
  }



}
