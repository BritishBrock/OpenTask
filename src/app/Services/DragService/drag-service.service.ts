import { ChangeDetectorRef, ElementRef, Injectable } from '@angular/core';
import { Coord } from '../../interfaces/Coord/Coord';
import { TaskViewerBoardService } from '../taskViewerBoard/task-viewer-board.service';

@Injectable({
  providedIn: 'root'
})
export class DragServiceService {

  constructor(private taskViewerService:TaskViewerBoardService) { }

  Tasks?:any;
  currentBardPos:Coord = {x:0,y:0}
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
      }
    } 
    delete this.Tasks;
  }
    


}
