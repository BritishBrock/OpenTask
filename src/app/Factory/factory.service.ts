import { Injectable } from '@angular/core';
import { Task } from '../Models/Task/Task';
import { TASKDATES, TASKACTIONS } from '../Data/TaskData/Task';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {

  constructor() { }

  generateTasks(amount:number){
    let arrayOfTasks:Task[] = [];
    for(let i = 0; i < amount;i++){
      arrayOfTasks.push(new Task(TASKACTIONS[Math.floor(Math.random() * TASKACTIONS.length)] +" task "+  TASKDATES[Math.floor(Math.random() * TASKDATES.length)], this.generateColor()));
    }
    return arrayOfTasks;
  }

  generateColor():string{
    let char = "123456789ABCDEF";
    let hexCol = "#";
    for(let i = 0; i < 6; i++){
      hexCol += char.charAt(Math.floor(Math.random() * char.length));
    }
    return hexCol;
  }



}
