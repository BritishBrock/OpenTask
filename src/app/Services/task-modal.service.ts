import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from '../Models/Task/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskModalService {

  constructor() { }
  
  taskModal:Subject<Task> = new Subject<Task>();

}
