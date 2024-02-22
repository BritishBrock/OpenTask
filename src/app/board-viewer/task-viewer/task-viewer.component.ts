import { Component, ElementRef, ViewChild } from '@angular/core';
import { FactoryService } from '../../Factory/factory.service';
import { Task } from '../../Models/Task/Task';
import { DragServiceService } from '../../Services/DragService/drag-service.service';
import { Coord } from '../../interfaces/Coord/Coord';
import { TaskList } from '../../Models/TaskList/TaskList';
import { TaskViewerBoardService } from '../../Services/taskViewerBoard/task-viewer-board.service';
import { StickyNote } from '../../Models/stickyNote/stickyNote';
import { TaskModalService } from '../../Services/task-modal.service';

@Component({
  selector: 'app-task-viewer',
  templateUrl: './task-viewer.component.html',
  styleUrl: './task-viewer.component.scss',
})
export class TaskViewerComponent {
  tasks: Task[] = [];
  taskLists: TaskList[] = [];
  stickyNotes: StickyNote[] = [];
  select: HTMLElement = document.createElement('div');
  htmlElement!: HTMLElement;
  isselect = false;
  isselectM = false;
  iSX = 0;
  iSY = 0;

  iMX = 0;
  iMY = 0;
  mouseDown = false;
  isMoving: boolean = false;

  isCreating:string = "";



  createList = [
    {
      title:"Task",
      click: ()=>{
        this.isCreating = "task"; 
        this.htmlElement.style.backgroundColor = "grey"
      }
    },
    {
      title:"Task List",
      click: ()=>{
        this.isCreating = "taskList"; 
        this.htmlElement.style.backgroundColor = "grey"
      }
    },
    {
      title:"Sticky Note",
      click: ()=>{
        this.isCreating = "stickyNote"; 
        this.htmlElement.style.backgroundColor = "grey"
      }
    }
  ]







  constructor(
    private FactoryService: FactoryService,
    private elRef: ElementRef,
    private dragService: DragServiceService,
    private taskviewerService: TaskViewerBoardService,
    private taskModalService:TaskModalService,
  ) {
    //   this.elRef.nativeElement.addEventListener('contextmenu', (event:any) => {
    //     event.preventDefault();
    // });
  }

  isCreateMenuOpen:boolean = false;
  toggleCreateMenu(){
    this.isCreateMenuOpen = !this.isCreateMenuOpen;
  }


  createTask(x:number,y:number){
    let t  =new Task("new task","#FFAA97")
    t.pos = {x:(this.dragService.currentBardPos.x*-1) +x,y:(this.dragService.currentBardPos.y*-1) +y};
    this.taskviewerService.globalTasks.push(t);
    this.isCreating = ""; 
    this.htmlElement.style.backgroundColor = "white"
  }
  createTaskList(x:number,y:number){
    let t  =new TaskList()
    t.pos = {x:(this.dragService.currentBardPos.x*-1) +x,y:(this.dragService.currentBardPos.y*-1) +y};
    this.taskviewerService.globalTaskLists.push(t);
    this.isCreating = ""; 
    this.htmlElement.style.backgroundColor = "white"
  }
  createStickyNote(x:number,y:number){
    let t  =new StickyNote()
    t.pos = {x:(this.dragService.currentBardPos.x*-1) +x,y:(this.dragService.currentBardPos.y*-1) +y};
    this.taskviewerService.globalStickyNotes.push(t);
    this.isCreating = ""; 
    this.htmlElement.style.backgroundColor = "white"
  }
  previousTouch:any;
  isModalOpen = false;
  ngOnInit() {
    

    
    this.tasks = this.taskviewerService.globalTasks;
    this.taskLists = this.taskviewerService.globalTaskLists;
    this.stickyNotes = this.taskviewerService.globalStickyNotes;

    this.htmlElement = this.elRef.nativeElement;
    this.dragService.viewBoard = this.htmlElement;
    //set view in the center

    this.htmlElement.style.left = this.dragService.currentBardPos.x + 'px';
    this.htmlElement.style.top = this.dragService.currentBardPos.y + 'px';


    this.taskModalService.TaskModalOpen.subscribe(isOpen=>{
      this.isModalOpen = isOpen;
    })

    window.addEventListener('keydown', (event) => {
      if (event.key == 'Shift') this.isselect= true;
    });
    window.addEventListener('keyup', (event) => {
      if (event.key == 'Shift') this.isselect= false;
    });
    window.addEventListener('wheel', (event) => {
      if (event.deltaY == -100) {
        this.zoomIn();
      } else if (event.deltaY == 100) {
        this.zoomOut();
      }
    });

    this.select.classList.add('selector');
    this.elRef.nativeElement.addEventListener('mousedown', (event: any) => {
      if (this.dragService.Tasks) return;

     
        this.isselectM= true;
        this.iSX = event.x;
        this.iSY = event.y;
        this.elRef.nativeElement.append(this.select);
      
       if(!this.isselect){

         this.iMX = event.x;
         this.iMY = event.y;
         this.mouseDown = true;
       }
      

      if( this.isCreating){
        if(this.isCreating == "task") this.createTask(event.x,event.y)
        if(this.isCreating == "taskList") this.createTaskList(event.x,event.y)
        if(this.isCreating == "stickyNote") this.createStickyNote(event.x,event.y)
      }



    });
    this.elRef.nativeElement.addEventListener("touchmove", (event: any) => {
      event.preventDefault();
      if(this.isModalOpen)return;
      var touch = event.targetTouches[0];
      if (this.dragService.Tasks){
        this.redoCanvas()
        this.dragService.moveSelectedHTMLElement({
          x: touch.clientX,
          y: touch.clientY,
        } as Coord);
      }
      else if (this.isselect && this.isselectM) {
        let width = Math.abs(this.iSX - event.x);
        let height = Math.abs(this.iSY - event.y);
        this.select.style.width = width + 'px';
        this.select.style.height = height + 'px';
        this.select.style.left =Math.abs(parseInt(this.htmlElement.style.left)) + this.iSX + 'px';
        this.select.style.top = this.iSY + 'px';
        this.select.style.position = 'absolute';
        this.select.style.border = ' 1px dashed blue';
      }
      
      if (!this.dragService.Tasks) {
        const touch = event.touches[0];

        if (this.previousTouch) {
          let velocidad = 5;
            event.movementX = touch.pageX < this.previousTouch.pageX ? -velocidad : velocidad;
            event.movementY = touch.pageY < this.previousTouch.pageY ? -velocidad : velocidad;
            this.dragService.setBoardPos({x: parseInt(this.htmlElement.style.left) +(event.movementX  ),y:parseInt(this.htmlElement.style.top) +(event.movementY ) })
        };
    
        this.previousTouch = touch;
      }
    });

    this.elRef.nativeElement.addEventListener('mouseleave', (event: any) => {
      if(!this.dragService.Tasks)return;
      this.dragService.Tasks.htmlElement!.style.position = "absolute"
      this.dragService.Tasks.htmlElement!.style.left = event.x  +"px";
      this.dragService.Tasks.htmlElement!.style.top =  event.y +"px";
      //this.dragService.getPlaceOfDropped();
       this.dragService.clearSelectedHTMLElement();
    })
    this.elRef.nativeElement.addEventListener('mousemove', (event: any) => {
    if(this.isModalOpen)return;
      if (this.dragService.Tasks){
        
        this.redoCanvas()
          this.dragService.moveSelectedHTMLElement({
            x: event.x,
            y: event.y,
          } as Coord);
      }
      else if (this.isselect && this.isselectM) {
        let width = Math.abs(this.iSX - event.x);
        let height = Math.abs(this.iSY - event.y);
        this.select.style.width = width + 'px';
        this.select.style.height = height + 'px';
        this.select.style.left =Math.abs(parseInt(this.htmlElement.style.left)) + this.iSX + 'px';
        this.select.style.top = this.iSY + 'px';
        this.select.style.position = 'absolute';
        this.select.style.border = ' 1px dashed blue';
      }
      if (this.mouseDown) {
        this.dragService.setBoardPos({x: parseInt(this.htmlElement.style.left) +(event.movementX  ),y:parseInt(this.htmlElement.style.top) +(event.movementY ) })
      
      }
    });

    this.elRef.nativeElement.addEventListener('mouseup', (event: any) => {
      this.iMX = 0;
      this.iMY = 0;
      this.mouseDown = false;
      this.isMoving = false;
      this.isselectM= false;
      if (this.dragService.Tasks) return;
    });
  }

  zoom: number = 1;
  zoomIn() {
    // this.zoom += 0.1;
    // this.htmlElement.style.scale = this.zoom+"";
  }

  zoomOut() {
    // this.zoom -= 0.1;
    // this.htmlElement.style.scale = this.zoom+"" ;
  }
  ngAfterViewInit(){
   
    let c = <HTMLCanvasElement>document.getElementById("canvas");
    c.width = this.htmlElement.clientWidth;
    c.height = this.htmlElement.clientHeight;
    var ctx = c.getContext("2d")!;


    for(let i = 0; i < this.taskLists.length;i++){
      if(this.taskLists[i].relatesTo != undefined){
        ctx.moveTo(this.taskLists[i].pos.x + this.taskLists[i].htmlElement.clientWidth,this.taskLists[i].pos.y+ this.taskLists[i].htmlElement.clientHeight/2)
        ctx.lineTo(this.taskLists[i].relatesTo!.pos.x + this.taskLists[i].relatesTo!.htmlElement.clientWidth / 2, this.taskLists[i].pos.y+ this.taskLists[i].htmlElement.clientHeight/2);
        ctx.lineTo(this.taskLists[i].relatesTo!.pos.x + this.taskLists[i].relatesTo!.htmlElement.clientWidth / 2,  this.taskLists[i].relatesTo!.pos.y);
        ctx.stroke();

      }
    }

    

  }


  redoCanvas(){
    let c = <HTMLCanvasElement>document.getElementById("canvas");
    c.width = this.htmlElement.clientWidth;
    c.height = this.htmlElement.clientHeight;
    var ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, c.width, c.height);

    for(let i = 0; i < this.taskLists.length;i++){
      if(this.taskLists[i].relatesTo != undefined){
        ctx.moveTo(this.taskLists[i].pos.x + this.taskLists[i].htmlElement.clientWidth,this.taskLists[i].pos.y+ this.taskLists[i].htmlElement.clientHeight/2)
        ctx.lineTo(this.taskLists[i].relatesTo!.pos.x + this.taskLists[i].relatesTo!.htmlElement.clientWidth / 2, this.taskLists[i].pos.y+ this.taskLists[i].htmlElement.clientHeight/2);
        ctx.lineTo(this.taskLists[i].relatesTo!.pos.x + this.taskLists[i].relatesTo!.htmlElement.clientWidth / 2,  this.taskLists[i].relatesTo!.pos.y);
        ctx.stroke();
      }
    }


  }
}
