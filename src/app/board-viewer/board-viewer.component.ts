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
          if(this.settings.userSettings.general.showLoadEffect)this.loadTransition();
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
    loadTransition(){

      //want to change this to css animation.

      this.done = false;
      let html:HTMLElement =  this.elRef.nativeElement;
      let transition = document.createElement("div");
      let transition1 = document.createElement("div");
      let transition2 = document.createElement("div");
      transition.style.width = "100%";
      transition.style.height = "100%";
      transition.style.position = "fixed";
      transition.style.left = "0px"
      transition.style.top = "100%";
      transition.style.backgroundColor = "black";
      transition.style.zIndex = "2000000000";

      transition1.style.width = "100%";
      transition1.style.height = "100px";
      transition1.style.position = "fixed";
      transition1.style.left = "0px"
      transition1.style.top = "100%";
      transition1.style.backgroundColor = "#646464";
      transition1.style.zIndex = "2000000000";

      transition2.style.width = "100%";
      transition2.style.height = "100px";
      transition2.style.position = "fixed";
      transition2.style.left = "0px"
      transition2.style.top = "100%";
      transition2.style.zIndex = "2000000000";
      transition2.style.backgroundColor = "#cdcdcd";
      let i = 150;
      let i1 = 145;
      let i2 = 140;
      let x = setInterval(()=>{
        transition.style.top = i+"%";
        transition1.style.top = i1+"%";
        transition2.style.top = i2+"%";
        i--;
        i1--;
        i2--;
        if(i == 0){
          this.done = true;

        }
        if(i == -110){
         clearInterval(x);
        }
      },5)

      html.append(transition);
      html.append(transition1);
      html.append(transition2);
    }
    done:boolean = !this.settings.userSettings.general.showLoadEffect;
    returnToBoardSelction(){
      this.router.navigateByUrl("/");
    }
 

}
