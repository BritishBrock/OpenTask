import { ElementRef, Injectable } from '@angular/core';
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
    this.Tasks.htmlElement.style.left =  newCoord.x  -(this.Tasks.htmlElement.offsetWidth /2)     + "px";
    this.Tasks.htmlElement.style.top = newCoord.y  -(this.Tasks.htmlElement.offsetHeight/2)  +  "px";
  }
  clearSelectedHTMLElement(){
    this.Tasks = undefined;
  }
  

  getPlaceOfDropped(){
    console.log(this.taskViewerService.getTaskListsAtPosition(this.Tasks.pos))
  }
    


}
