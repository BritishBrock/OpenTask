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
      arrayOfTasks.push(new Task(i, TASKACTIONS[Math.floor(Math.random() * TASKACTIONS.length)] +" task "+  TASKDATES[Math.floor(Math.random() * TASKDATES.length)], this.generateColor() ));
    }
    return arrayOfTasks;
  }

  generateColor():string{
    let r = Math.floor(Math.random() *256);
    let g= Math.floor(Math.random() *256);
    let b = Math.floor(Math.random() *256);
    return `rgb(${r},${g},${b})`;
  }



}
