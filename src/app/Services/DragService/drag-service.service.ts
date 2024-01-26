import { ChangeDetectorRef, ElementRef, Injectable } from '@angular/core';
import { Coord } from '../../interfaces/Coord/Coord';
import { TaskViewerBoardService } from '../taskViewerBoard/task-viewer-board.service';

@Injectable({
  providedIn: 'root'
})
export class DragServiceService {

  constructor(private taskViewerService:TaskViewerBoardService) { }

  Tasks?:any;
  
  selectHTMLElement(element:any){
    this.Tasks = element;
  }

  moveSelectedHTMLElement(newCoord:Coord){
    if(!this.Tasks)return;
    this.Tasks.pos = newCoord;
   
    //Absolute doesnt work beacuse absolute is 0,0 of the element its in. 
    this.Tasks.htmlElement.style.position= "fixed";
    this.Tasks.htmlElement.style.left =  newCoord.x  -(this.Tasks.htmlElement.offsetWidth /2)     + "px";
    this.Tasks.htmlElement.style.top = newCoord.y  -(this.Tasks.htmlElement.offsetHeight/2)  +  "px";

  }
  clearSelectedHTMLElement(){
    this.Tasks = undefined;
  }
  

  getPlaceOfDropped(){
    let taskList = this.taskViewerService.getTaskListsAtPosition(this.Tasks.pos);
    if(taskList == undefined){
      if(this.Tasks.isInTaskList){
        this.taskViewerService.globalTaskLists.get(this.Tasks.taskListId)?.removeFromList(this.Tasks.id);
        this.Tasks.removeHtmlElement();
        this.Tasks.removeTaskListId();
        this.taskViewerService.addToGlobalTasks(this.Tasks);
        console.log(this.taskViewerService.globalTasks)
        console.log(this.taskViewerService.globalTaskLists.get(this.Tasks.taskListId))
      }
    }else{
      taskList.addTaskToList(this.Tasks);
      this.Tasks.setTaskListId(taskList.id);
      this.taskViewerService.removeTaskFromGlobalTasks(this.Tasks.id);
      this.Tasks.removeHtmlElement();
    } 

 
  }
    


}
