import { Component, ElementRef } from '@angular/core';
import { TaskViewerComponent } from './task-viewer/task-viewer.component';
import { TaskViewerListComponent } from './task-viewer-list/task-viewer-list.component';
import { TaskViewerCalendarComponent } from './task-viewer-calendar/task-viewer-calendar.component';
import { SimpleViewerComponent } from './simple-viewer/simple-viewer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesViewerComponent } from './notes-viewer/notes-viewer.component';
import { BoardService } from '../Services/board/board.service';
import { DBService } from '../Services/DB/db.service';
import { BoardSerializer } from '../Models/Board/BoardSerializer';

@Component({
  selector: 'app-board-viewer',
  templateUrl: './board-viewer.component.html',
  styleUrl: './board-viewer.component.scss'
})
export class BoardViewerComponent {
    isNavClosed:boolean=false;
    component:any = TaskViewerComponent;
    constructor(
      private elRef:ElementRef,
      private router:Router,
      private activeRoute:ActivatedRoute,
      private boardService:BoardService,
      private DBService:DBService,
      ){}


      ngOnInit(){
        let doesntExists = true;
        this.activeRoute.params.subscribe((query)=>{
          if( this.boardService.globalBoards.length == 0){
              this.DBService.openDB();
                this.DBService.dbCompelte.subscribe((data) => {
                  
            this.DBService.loadBoards().onsuccess = (event: any) => {
              let boards = event.target.result;
              this.boardService.globalBoards.push(...BoardSerializer.DeSerialize(boards))
              for(let i = 0; i < this.boardService.globalBoards.length;i++){
                if(this.boardService.globalBoards[i].id == query["id"]){
                  doesntExists = false;
                  this.boardService.setActiveBoard(query["id"])
                  this.router.navigateByUrl("/"+query["id"])
                  break;
                };
              }
              if(doesntExists)this.router.navigateByUrl("/")
            };
          })
          }else{
            for(let i = 0; i < this.boardService.globalBoards.length;i++){
              if(this.boardService.globalBoards[i].id == query["id"])this.router.navigateByUrl("/"+query["id"]);
            }
          }
          
          

          query["id"]
        })
      }


    boardViews = [
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
