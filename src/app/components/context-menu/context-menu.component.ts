import { Component } from '@angular/core';
import { ContextMenuService } from '../../Services/ContextMenu/context-menu.service';
import { Coord } from '../../interfaces/Coord/Coord';
import { SettingsService } from '../../Services/settings/settings.service';
import { DragServiceService } from '../../Services/DragService/drag-service.service';
import { TaskViewerBoardService } from '../../Services/taskViewerBoard/task-viewer-board.service';
import { Task } from '../../Models/Task/Task';
import { TaskList } from '../../Models/TaskList/TaskList';
import { StickyNote } from '../../Models/stickyNote/stickyNote';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss'
})
export class ContextMenuComponent {
    constructor(public ContextMenuService:ContextMenuService,private settingsService:SettingsService,private dragService:DragServiceService, private taskviewerService:TaskViewerBoardService){

    }
    contextPos:Coord = {x:0,y:0}
    ngOnInit(){
      if(!this.settingsService.userSettings.general.customContextMenu)return;
      

      this.ContextMenuService.isOpen.subscribe((isOpen:boolean)=>{
        this.ContextMenuService._isOpen = isOpen;
        document.getElementById("contextMenuBody")!.style.display = isOpen ? "grid": "none";
      })
      this.ContextMenuService.displayOfContextMenu.subscribe((coords:Coord)=>{
        document.getElementById("contextMenuBody")!.style.left = coords.x + "px";
        document.getElementById("contextMenuBody")!.style.top = coords.y + "px";
        this.contextPos = coords;
      })
    }
    maxIndex:any = 0;
    createMenu:boolean = false;
    moveZIndex(direction:number){
      console.log("f")
      if(!this.ContextMenuService.element || !this.ContextMenuService.element.zIndex)return;
      this.ContextMenuService.element.zIndex+=direction;
      if(this.ContextMenuService.element.zIndex > this.maxIndex)this.maxIndex = this.ContextMenuService.element.zIndex;
      this.ContextMenuService.element.htmlElement.style.zIndex =this.ContextMenuService.element.zIndex+ "";
      this.ContextMenuService.switchContextMenu();
    }
   setZIndex(direction:number){
      if(!this.ContextMenuService.element || !this.ContextMenuService.element.zIndex)return;
      this.ContextMenuService.element.zIndex = direction;
      if(this.ContextMenuService.element.zIndex > this.maxIndex)this.maxIndex = this.ContextMenuService.element.zIndex;
      this.ContextMenuService.element.htmlElement.style.zIndex =this.ContextMenuService.element.zIndex+ "";
      this.ContextMenuService.switchContextMenu();
    }
    createElement(type:number){
      this.ContextMenuService.isOpen.next(false);
      console.log("f")
      switch(type){
        case 0:
          this.createTask(this.contextPos.x,this.contextPos.y)
          break;
        case 1:
          this.createTaskList(this.contextPos.x,this.contextPos.y)
          break;
        case 2:
          this.createStickyNote(this.contextPos.x,this.contextPos.y)
        break;
      }


    }
    createTask(x: number, y: number) {
      let t = new Task('new task');
      t.pos = {
        x:  x,
        y:  y,
      };
      this.taskviewerService.globalTasks.push(t);

    }
    createTaskList(x: number,y: number) {
      let t = new TaskList();
      t.pos = {
        x:  x,
        y:  y,
      };
      this.taskviewerService.globalTaskLists.push(t);

    }
    createStickyNote(x: number, y: number) {
      let t = new StickyNote();
      t.pos = {
        x:  x,
        y:  y,
      };
      this.taskviewerService.globalStickyNotes.push(t);

    }
}
