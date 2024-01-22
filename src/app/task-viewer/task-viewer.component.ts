import { Component } from '@angular/core';
import { FactoryService } from '../Factory/factory.service';
import { Task } from '../Models/Task/Task';

@Component({
  selector: 'app-task-viewer',
  templateUrl: './task-viewer.component.html',
  styleUrl: './task-viewer.component.scss'
})
export class TaskViewerComponent {
  tasks:Task[] = [];
  constructor(private FactoryService:FactoryService){

  }
  ngOnInit(){
    this.tasks = this.FactoryService.generateTasks(10);
  }

}
