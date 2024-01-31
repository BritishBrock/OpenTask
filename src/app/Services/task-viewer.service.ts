import { Injectable } from '@angular/core';
import { Task } from '../Models/Task/Task';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskViewerService {

  constructor() { }

  taskSelected?:Task;

}
