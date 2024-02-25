import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from '../Models/Task/Task';
import { TaskList } from '../Models/TaskList/TaskList';
import { StickyNote } from '../Models/stickyNote/stickyNote';

@Injectable({
  providedIn: 'root'
})
export class TaskModalService {

  constructor() { }
  
  taskModal:Subject<Task> = new Subject<Task>();
  taskListModal:Subject<TaskList> = new Subject<TaskList>();
 stickyNoteModal:Subject<StickyNote> = new Subject<StickyNote>();
  TaskModalOpen:Subject<boolean> = new Subject<boolean>()
}
