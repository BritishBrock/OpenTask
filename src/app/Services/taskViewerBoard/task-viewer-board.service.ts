import { Injectable } from '@angular/core';
import { TaskList } from '../../Models/TaskList/TaskList';
import { Task } from '../../Models/Task/Task';
import { Coord } from '../../interfaces/Coord/Coord';
import { FactoryService } from '../../Factory/factory.service';

@Injectable({
  providedIn: 'root'
})
export class TaskViewerBoardService {

  constructor(private FactoryService:FactoryService) { 
    let arr = this.FactoryService.generateTasks(10);
    for(let i = 0; i < arr.length;i++){
      this.addToGlobalTasks(arr[i]);
    }
    this.addToGlobalTasksList(new TaskList(0));
  }
  globalTasks:Map<Number,Task> =  new Map<number,Task>();
  globalTaskLists:Map<Number,TaskList> =  new Map<number,TaskList>();

  addToGlobalTasks(task:Task){
    this.globalTasks.set(task.id,task);
  }
 addToGlobalTasksList(taskList:TaskList){
    this.globalTaskLists.set(taskList.id,taskList);
  }
  getFromGlobalTasksList(id:number){
    return this.globalTaskLists.get(id) ?? undefined;
  }

  removeTaskFromGlobalTasks(id:number){
    this.globalTasks.delete(id);
  }

  
  

  




  getTaskListsAtPosition(coord:Coord){
      //need possible fix later one. Boundries not correct i believe.
      let globalTaskListsArray = Array.from(this.globalTaskLists,([key,value])=>{return value})
      for(let i = 0; i < globalTaskListsArray.length;i++){
        if(
          coord.x < globalTaskListsArray[i].pos.x + globalTaskListsArray[i].htmlElement.clientWidth &&
          coord.x > globalTaskListsArray[i].pos.x &&
          coord.y < globalTaskListsArray[i].pos.y + globalTaskListsArray[i].htmlElement.clientHeight &&
          coord.y > globalTaskListsArray[i].pos.y 
        ){console.log("f");return globalTaskListsArray[i];}
      }
      return undefined;
  }
  
}
