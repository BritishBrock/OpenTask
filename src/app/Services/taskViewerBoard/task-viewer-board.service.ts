import { Injectable } from '@angular/core';
import { TaskList } from '../../Models/TaskList/TaskList';
import { Task } from '../../Models/Task/Task';
import { Coord } from '../../interfaces/Coord/Coord';

@Injectable({
  providedIn: 'root'
})
export class TaskViewerBoardService {

  constructor() { }

  globalTasks:Task[] = []
  globalTaskLists:TaskList[] = [new TaskList()];


  addToGlobalTasks(task:Task){
    this.globalTasks.push(task) 
  }

  addToGlobalTaskLists(taskList:TaskList){
    this.globalTaskLists.push(taskList) 
  }

  getTaskListsAtPosition(coord:Coord){
      //need possible fix later one. Boundries not correct i believe.
      for(let i = 0; i < this.globalTaskLists.length;i++){
        if(
          coord.x < this.globalTaskLists[i].pos.x + this.globalTaskLists[i].htmlElement.clientWidth &&
          coord.x > this.globalTaskLists[i].pos.x &&
          coord.y < this.globalTaskLists[i].pos.y + this.globalTaskLists[i].htmlElement.clientHeight &&
          coord.y > this.globalTaskLists[i].pos.y 
        ){console.log("f");return this.globalTaskLists[i];}
      }
      return undefined;
  }
  
}
