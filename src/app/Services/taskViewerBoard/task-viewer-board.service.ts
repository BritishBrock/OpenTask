import { Injectable } from '@angular/core';
import { TaskList } from '../../Models/TaskList/TaskList';
import { Task } from '../../Models/Task/Task';
import { Coord } from '../../interfaces/Coord/Coord';
import { FactoryService } from '../../Factory/factory.service';
import { StickyNote } from '../../Models/stickyNote/stickyNote';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskViewerBoardService {

  constructor(private FactoryService:FactoryService) { 
  }
  globalTasks:Task[]= [];
  globalTaskLists:TaskList[] = [];
  globalStickyNotes:StickyNote[] = [];

  addToGlobalTasks(task:Task){
    this.globalTasks.push(task);
  }
 addToGlobalTasksList(taskList:TaskList){
    this.globalTaskLists.push(taskList);
  }

  getFromGlobalTasksList(id:number){
    for(let i = 0; i < this.globalTaskLists.length;i++){
      if(this.globalTaskLists[i].id == id){
        return this.globalTaskLists[i];
      }
    }
    return undefined;
  }

  removeTaskFromGlobalTasks(id:number){
    for(let i = 0; i < this.globalTasks.length;i++){
      if(this.globalTasks[i].id == id){
        this.globalTasks.splice(i, 1);
      }
    }
  }


  taskListUpdateLines:Subject<boolean> = new Subject<boolean>();
  
  

  




  getTaskListsAtPosition(coord:Coord){
      //need possible fix later one. Boundries not correct i believe.
      let globalTaskListsArray =this.globalTaskLists
      for(let i = 0; i < globalTaskListsArray.length;i++){
        if(
          coord.x < globalTaskListsArray[i].pos.x + globalTaskListsArray[i].htmlElement.clientWidth &&
          coord.x > globalTaskListsArray[i].pos.x &&
          coord.y < globalTaskListsArray[i].pos.y + globalTaskListsArray[i].htmlElement.clientHeight &&
          coord.y > globalTaskListsArray[i].pos.y 
        ){return globalTaskListsArray[i];}
      }
      return undefined;
  }
  
}
