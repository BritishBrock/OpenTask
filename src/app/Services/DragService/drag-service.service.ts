import { ChangeDetectorRef, ElementRef, Injectable } from '@angular/core';
import { Coord } from '../../interfaces/Coord/Coord';
import { TaskViewerBoardService } from '../taskViewerBoard/task-viewer-board.service';

@Injectable({
  providedIn: 'root'
})
export class DragServiceService {

  constructor(private taskViewerService:TaskViewerBoardService) { }

  Tasks?:any;
  currentBardPos:Coord = {x:0,y:0};
  currentZoom:number = 1;
  currentZoomOffset:Coord = {x:0,y:0};
  viewBoard?:HTMLElement;
  selectHTMLElement(element:any){
    this.Tasks = element;
  }

  moveSelectedHTMLElement(coords:Coord){
    if(!this.Tasks)return;
    this.Tasks.pos.y += coords.y;
    this.Tasks.pos.x += coords.x;
    //Absolute doesnt work beacuse absolute is 0,0 of the element its in. 
    this.Tasks.htmlElement.style.position= "absolute";
    this.Tasks.htmlElement.style.left =   this.Tasks.pos.x+ "px";
    this.Tasks.htmlElement.style.top =  this.Tasks.pos.y +  "px";


  }
  clearSelectedHTMLElement(){
    this.Tasks = undefined;
  }

  goToBoardPosEL(pos:Coord){
    if(!this.viewBoard)return;
    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    this.currentBardPos.y =  (pos.y - vh/2) * -1 ;
    this.currentBardPos.x = (pos.x - vw/2) *-1;
    this.viewBoard.style.left = this.currentBardPos.x  + 'px';
    this.viewBoard.style.top = this.currentBardPos.y + 'px';
  }

  setBoardPos(pos:Coord){
    if(!this.viewBoard)return;
    
    this.currentBardPos.y =  pos.y ;
    this.currentBardPos.x = pos.x;
    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

    if(this.currentBardPos.y  >0)this.currentBardPos.y = 0
    if(this.currentBardPos.x >0)this.currentBardPos.x = 0
    if(this.currentBardPos.y < (this.viewBoard.clientHeight*(this.currentZoom) - vh)*-1 )this.currentBardPos.y = (this.viewBoard.clientHeight*(this.currentZoom) - vh )*-1
    if( this.currentBardPos.x < (this.viewBoard.clientWidth*(this.currentZoom) - vw)*-1) this.currentBardPos.x =    (this.viewBoard.clientWidth*(this.currentZoom) - vw )*-1
    this.viewBoard.style.left = this.currentBardPos.x  + 'px';
    this.viewBoard.style.top = this.currentBardPos.y + 'px';

  }

  getPlaceOfDropped(){
    let taskList = this.taskViewerService.getTaskListsAtPosition(this.Tasks.pos);
    if(taskList == undefined){
      if(this.Tasks.taskListId){
        this.taskViewerService.getFromGlobalTasksList(this.Tasks.taskListId)?.removeFromList(this.Tasks.id);
        this.Tasks.removeTaskListId();
        this.taskViewerService.addToGlobalTasks(this.Tasks);
      }
    }else{
      if(!this.Tasks.taskListId){
        this.Tasks.setTaskListId(taskList.id);
        taskList.addTaskToList(this.Tasks);
        this.taskViewerService.removeTaskFromGlobalTasks(this.Tasks.id);
      }else{
        this.taskViewerService.getFromGlobalTasksList(this.Tasks.taskListId)?.removeFromList(this.Tasks.id);
        this.Tasks.removeTaskListId();
        this.Tasks.setTaskListId(taskList.id);
        taskList.addTaskToList(this.Tasks);
      }
    } 
      this.clearSelectedHTMLElement()
     }
    


}

