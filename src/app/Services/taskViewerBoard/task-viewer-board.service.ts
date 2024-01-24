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
    
  }
  
}
