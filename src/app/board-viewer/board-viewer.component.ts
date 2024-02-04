import { Component } from '@angular/core';
import { TaskViewerComponent } from './task-viewer/task-viewer.component';
import { TaskViewerListComponent } from './task-viewer-list/task-viewer-list.component';

@Component({
  selector: 'app-board-viewer',
  templateUrl: './board-viewer.component.html',
  styleUrl: './board-viewer.component.scss'
})
export class BoardViewerComponent {
    isNavClosed:boolean=false;
    component:any = TaskViewerComponent;


    boardViews = [
      {
        title:"Visual Task",
        onclick:()=>{
          this.component = TaskViewerComponent;
        }
      },
      {
        title:"List Tasks",
        onclick:()=>{
          this.component = TaskViewerListComponent;
        }
      },
    ]


}
