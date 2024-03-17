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
import { Board } from '../Models/Board/Board';
import { SettingsService } from '../Services/settings/settings.service';

@Component({
  selector: 'app-board-viewer',
  templateUrl: './board-viewer.component.html',
  styleUrl: './board-viewer.component.scss'
})
export class BoardViewerComponent {
    isNavClosed:boolean=false;
    component:any;
    constructor(
      private elRef:ElementRef,
      private router:Router,
      private activeRoute:ActivatedRoute,
      private boardService:BoardService,
      private DBService:DBService,
      private settings:SettingsService,
      ){}

      isQuickBoardSelectOpen:boolean = false;
      allBoards:Board[] = this.boardService.globalBoards;
      setComponent(){
        switch(this.settings.userSettings.general.defaultMenu){
          case "Notes":
            this.component = NotesViewerComponent
          break;
          case "List":
            this.component = TaskViewerListComponent
          break;
          case "Calender":
            this.component = TaskViewerCalendarComponent
          break;
          case "Visual":
          default:
            this.component = TaskViewerComponent
          break;
        }
      }
      ngOnInit(){

        this.setComponent()
       
        let doesntExists = true;
       
        this.activeRoute.params.subscribe((query)=>{
          if(this.settings.userSettings.general.showLoadEffect){
            this.done = false;
            document.getElementById("animate2")?.classList.remove('animate2');
            document.getElementById("animate")?.classList.remove('animate');
            setTimeout(()=>{ document.getElementById("animate2")?.classList.add('animate2');})
            setTimeout(()=>{   document.getElementById("animate")?.classList.add('animate');  this.done = true;})

          }
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
                  this.router.navigateByUrl("b/"+query["id"])
                 
                  break;
                };
              }
              if(doesntExists)this.router.navigateByUrl("/")

            };
          })
          }else{
            for(let i = 0; i < this.boardService.globalBoards.length;i++){
              if(this.boardService.globalBoards[i].id == query["id"]){
                this.boardService.setActiveBoard(query["id"])
                this.router.navigateByUrl("b/"+query["id"]);
   
              }
            }
          }
          query["id"]
        })
      }
      goToSettings(){
        this.router.navigateByUrl("/settings");
      }
      goToBoard(boardId:number){
        this.isNavClosed = false
        this.router.navigateByUrl("/b/"+boardId);
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
    done:boolean = !this.settings.userSettings.general.showLoadEffect;
    returnToBoardSelction(){
      this.router.navigateByUrl("/");
    }
 

}
