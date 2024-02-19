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
    // let arr = this.FactoryService.generateTasks(10);
    // for(let i = 0; i < arr.length;i++){
    //   arr[i].pos = {x:10,y:50 * i}
    //   this.addToGlobalTasks(arr[i]);
    // }
    let t1 = new TaskList();
 
    let t2 = new TaskList();
    let t3 = new TaskList();
    t1.title = "title 1"
    t1.relatesTo = t2;
    t1.pos = {x:0,y:200}
    t2.pos = {x:1000,y:0}
    t3.pos = {x:500,y:500}

    this.addToGlobalTasksList(t1);
    this.addToGlobalTasksList(t2);

  }
  globalTasks:Task[]= [];
  globalTaskLists:TaskList[] = [];

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
