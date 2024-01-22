import { Injectable } from '@angular/core';
import { Task } from '../Models/Task/Task';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {

  constructor() { }

  generateTasks(amount:number){
    let arrayOfTasks:Task[] = [];
    for(let i = 0; i < amount;i++){
      arrayOfTasks.push(new Task(i));
    }
    return arrayOfTasks;
  }



}
