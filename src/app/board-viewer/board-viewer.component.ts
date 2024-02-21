import { Component, ElementRef } from '@angular/core';
import { TaskViewerComponent } from './task-viewer/task-viewer.component';
import { TaskViewerListComponent } from './task-viewer-list/task-viewer-list.component';
import { TaskViewerCalendarComponent } from './task-viewer-calendar/task-viewer-calendar.component';
import { SimpleViewerComponent } from './simple-viewer/simple-viewer.component';
import { Router } from '@angular/router';
import { NotesViewerComponent } from './notes-viewer/notes-viewer.component';

@Component({
  selector: 'app-board-viewer',
  templateUrl: './board-viewer.component.html',
  styleUrl: './board-viewer.component.scss'
})
export class BoardViewerComponent {
    isNavClosed:boolean=false;
    component:any = TaskViewerCalendarComponent;
    constructor(
      private elRef:ElementRef,
      private router:Router
      ){}

    boardViews = [
      // {
      //   title:"Simple View",
      //   onclick:()=>{
      //     this.elRef.nativeElement.style.overflow = "auto";
      //     this.component = SimpleViewerComponent;
      //     this.isNavClosed=false;
      //   }
      // },
      {
        title:"Visual Task",
        onclick:()=>{
          this.component = TaskViewerComponent;
          this.isNavClosed=false;
        }
      },
      {
        title:"List Tasks",
        onclick:()=>{
          this.component = TaskViewerListComponent;
          this.isNavClosed=false;
        }
      },
      {
        title:"List Calender",
        onclick:()=>{
          this.component = TaskViewerCalendarComponent;
          this.isNavClosed=false;
        }
      },
      {
        title:"Notes ",
        onclick:()=>{
          this.component = NotesViewerComponent;
          this.isNavClosed=false;
        }
      },
      
    ]



    returnToBoardSelction(){
      this.router.navigateByUrl("/");
    }

}
