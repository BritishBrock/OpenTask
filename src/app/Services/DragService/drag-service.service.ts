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
  viewBoard?:HTMLElement;
  selectHTMLElement(element:any){
    this.Tasks = element;
  }

  moveSelectedHTMLElement(newCoord:Coord){
    if(!this.Tasks)return;
    this.Tasks.pos = newCoord;
    this.Tasks.pos.y = newCoord.y - +10  ;
    this.Tasks.pos.x = newCoord.x  -(this.Tasks.htmlElement.offsetWidth /2)
    //Absolute doesnt work beacuse absolute is 0,0 of the element its in. 
    this.Tasks.htmlElement.style.position= "fixed";
    this.Tasks.htmlElement.style.left =  newCoord.x   + "px";
    this.Tasks.htmlElement.style.top =  newCoord.y +  "px";
    this.Tasks.pos.y =(this.currentBardPos.y*-1) +this.Tasks.pos.y;
    this.Tasks.pos.x = (this.currentBardPos.x*-1) + this.Tasks.pos.x

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
    console.log(this.currentBardPos.x)
    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    if(this.currentBardPos.y >0)this.currentBardPos.y = 0
    if(this.currentBardPos.x >0)this.currentBardPos.x = 0
     if(this.currentBardPos.y < (this.viewBoard.clientHeight - vh)*-1 )this.currentBardPos.y = (this.viewBoard.clientHeight - vh)*-1
     if(this.currentBardPos.x < (this.viewBoard.clientWidth - vw)*-1) this.currentBardPos.x =  (this.viewBoard.clientWidth - vw)*-1
    this.viewBoard.style.left = this.currentBardPos.x  + 'px';
    this.viewBoard.style.top = this.currentBardPos.y + 'px';

  }

  getPlaceOfDropped(){
    let taskList = this.taskViewerService.getTaskListsAtPosition(this.Tasks.pos);
    if(taskList == undefined){
      if(this.Tasks.isInTaskList){
        this.taskViewerService.getFromGlobalTasksList(this.Tasks.taskListId)?.removeFromList(this.Tasks.id);
        this.Tasks.removeTaskListId();
        this.taskViewerService.addToGlobalTasks(this.Tasks);
      }
    }else{
      if(!this.Tasks.isInTaskList){
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
    delete this.Tasks;
  }
    


}
