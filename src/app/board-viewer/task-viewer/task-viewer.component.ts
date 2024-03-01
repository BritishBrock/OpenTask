import { Component, ElementRef, ViewChild } from '@angular/core';
import { FactoryService } from '../../Factory/factory.service';
import { Task } from '../../Models/Task/Task';
import { DragServiceService } from '../../Services/DragService/drag-service.service';
import { Coord } from '../../interfaces/Coord/Coord';
import { TaskList } from '../../Models/TaskList/TaskList';
import { TaskViewerBoardService } from '../../Services/taskViewerBoard/task-viewer-board.service';
import { StickyNote } from '../../Models/stickyNote/stickyNote';
import { TaskModalService } from '../../Services/task-modal.service';
import { BoardService } from '../../Services/board/board.service';
import { ContextMenuService } from '../../Services/ContextMenu/context-menu.service';
import { SettingsService } from '../../Services/settings/settings.service';

@Component({
  selector: 'app-task-viewer',
  templateUrl: './task-viewer.component.html',
  styleUrl: './task-viewer.component.scss',
})
export class TaskViewerComponent {
  tasks: Task[] = [];
  taskLists: TaskList[] = [];
  stickyNotes: StickyNote[] = [];
  select: HTMLElement = document.createElement('div');
  htmlElement!: HTMLElement;
  isselect = false;
  isselectM = false;
  iSX = 0;
  iSY = 0;

  iMX = 0;
  iMY = 0;
  mouseDown = false;
  isMoving: boolean = false;

  isCreating: string = '';
  //add to settings menu.
  isCreatingOnMouse: boolean = false;

  createList = [
    {
      title: 'Task',
      click: () => {
        if (!this.isCreatingOnMouse) {
          let vw = Math.max(
            document.documentElement.clientWidth || 0,
            window.innerWidth || 0
          );
          let vh = Math.max(
            document.documentElement.clientHeight || 0,
            window.innerHeight || 0
          );
          this.createTask(vw / 2, vh / 2);
        } else {
          this.isCreating = 'task';
          this.htmlElement.style.backgroundColor = 'grey';
        }
      },
    },
    {
      title: 'Task List',
      click: () => {
        if (!this.isCreatingOnMouse) {
          let vw = Math.max(
            document.documentElement.clientWidth || 0,
            window.innerWidth || 0
          );
          let vh = Math.max(
            document.documentElement.clientHeight || 0,
            window.innerHeight || 0
          );
          this.createTaskList(vw / 2, vh / 2);
        } else {
          this.isCreating = 'taskList';
          this.htmlElement.style.backgroundColor = 'grey';
        }
      },
    },
    {
      title: 'Sticky Note',
      click: () => {
        if (!this.isCreatingOnMouse) {
          let vw = Math.max(
            document.documentElement.clientWidth || 0,
            window.innerWidth || 0
          );
          let vh = Math.max(
            document.documentElement.clientHeight || 0,
            window.innerHeight || 0
          );
          this.createStickyNote(vw / 2, vh / 2);
        } else {
          this.isCreating = 'stickyNote';
          this.htmlElement.style.backgroundColor = 'grey';
        }
      },
    },
  ];

  constructor(
    private FactoryService: FactoryService,
    private elRef: ElementRef,
    private dragService: DragServiceService,
    private taskviewerService: TaskViewerBoardService,
    private taskModalService: TaskModalService,
    private boardService: BoardService,
    private ContextMenuService: ContextMenuService,
    private settingsService: SettingsService
  ) {
    //   this.elRef.nativeElement.addEventListener('contextmenu', (event:any) => {
    //     event.preventDefault();
    // });
  }

  isCreateMenuOpen: boolean = false;
  toggleCreateMenu() {
    this.isCreateMenuOpen = !this.isCreateMenuOpen;
  }

  createTask(x: number, y: number) {
    let t = new Task('new task');
    t.pos = {
      x: this.dragService.currentBardPos.x * -1 + x,
      y: this.dragService.currentBardPos.y * -1 + y,
    };
    this.taskviewerService.globalTasks.push(t);
    this.isCreating = '';
    this.htmlElement.style.backgroundColor = 'white';
  }
  createTaskList(x: number, y: number) {
    let t = new TaskList();
    t.pos = {
      x: this.dragService.currentBardPos.x * -1 + x,
      y: this.dragService.currentBardPos.y * -1 + y,
    };
    this.taskviewerService.globalTaskLists.push(t);
    this.isCreating = '';
    this.htmlElement.style.backgroundColor = 'white';
  }
  createStickyNote(x: number, y: number) {
    let t = new StickyNote();
    t.pos = {
      x: this.dragService.currentBardPos.x * -1 + x,
      y: this.dragService.currentBardPos.y * -1 + y,
    };
    this.taskviewerService.globalStickyNotes.push(t);
    this.isCreating = '';
    this.htmlElement.style.backgroundColor = 'white';
  }

  isModalOpen = false;

  ngOnInit() {
    this.tasks = this.taskviewerService.globalTasks;
    this.taskLists = this.taskviewerService.globalTaskLists;
    this.stickyNotes = this.taskviewerService.globalStickyNotes;

    this.boardService.boardUpdates.subscribe(() => {
      this.tasks = this.taskviewerService.globalTasks;
      this.taskLists = this.taskviewerService.globalTaskLists;
      this.stickyNotes = this.taskviewerService.globalStickyNotes;
    });

    this.taskviewerService.taskListUpdateLines.subscribe(() => {
      this.drawLines(false);
    });

    this.htmlElement = this.elRef.nativeElement;
 
    document.oncontextmenu = (e) => {
      if (!this.settingsService.userSettings.general.customContextMenu)
        return true;
      this.ContextMenuService.switchContextMenu();
      this.ContextMenuService.changeDisplayOfContextMenu({ x: e.x, y: e.y });
      return false;
    };

    this.taskModalService.TaskModalOpen.subscribe((isOpen) => {
      this.isModalOpen = isOpen;
    });

    window.addEventListener('keydown', (event) => {
      if (event.key == 'Shift') this.isselect = true;
    });
    window.addEventListener('keyup', (event) => {
      if (event.key == 'Shift') this.isselect = false;
    });
    window.addEventListener('wheel', (event) => {
      if (event.deltaY == -100) {
        this.updateZoom(0.05)
      } else if (event.deltaY == 100) {
        this.updateZoom(-0.05)
      }
    });

    this.select.classList.add('selector');
    this.elRef.nativeElement.addEventListener('mousedown', (event: any) => {
      if (this.dragService.Tasks) return;

      this.isselectM = true;
      this.iSX = event.x;
      this.iSY = event.y;
      this.elRef.nativeElement.append(this.select);

      if (!this.isselect) {
        this.iMX = event.x;
        this.iMY = event.y;
        this.mouseDown = true;
      }

      if (this.isCreating) {
        if (this.isCreating == 'task') this.createTask(event.x, event.y);
        if (this.isCreating == 'taskList')
          this.createTaskList(event.x, event.y);
        if (this.isCreating == 'stickyNote')
          this.createStickyNote(event.x, event.y);
      }
    });

    this.elRef.nativeElement.addEventListener('mouseleave', (event: any) => {
      if (this.mouseDown) this.mouseDown = false;
      if (!this.dragService.Tasks) return;
      this.dragService.Tasks.htmlElement!.style.position = 'absolute';
      this.dragService.Tasks.htmlElement!.style.left = event.x + 'px';
      this.dragService.Tasks.htmlElement!.style.top = event.y + 'px';
      //this.dragService.getPlaceOfDropped();
      this.dragService.clearSelectedHTMLElement();
    });
  }
  @ViewChild('TaskViewerBoard') TaskViewerBoard?: ElementRef;

  zoom2: number = 100;
  updateZoom(amount:number){
    if (!this.TaskViewerBoard) return;
    if(this.dragService.Tasks)delete this.dragService.Tasks;
    if (this.dragService.currentZoom +amount > 1.5 ||this.dragService.currentZoom + amount< 0.5) return;
    this.dragService.currentZoom += amount;
    this.TaskViewerBoard.nativeElement.style.scale = this.dragService.currentZoom + '';
    this.moveBoard()
  }

  changeZoom() {
    if (!this.TaskViewerBoard) return;
    this.dragService.currentZoom = this.zoom2 / 100;
    this.TaskViewerBoard.nativeElement.style.scale =
      this.dragService.currentZoom + '';
      this.moveBoard()
  }
  auxzoom = 1;
  moveBoard(){
    if(this.auxzoom == this.dragService.currentZoom) return;
    this.dragService.currentZoomOffset = {
      x:this.dragService.currentBardPos.x + (this.auxzoom < this.dragService.currentZoom ?  375 : -375),
      y:this.dragService.currentBardPos.y + (this.auxzoom < this.dragService.currentZoom ?  375 : -375)
    }
    this.dragService.setBoardPos(
      this.dragService.currentZoomOffset
    )
    this.auxzoom = this.dragService.currentZoom;
  }

createSelect(event:any){
  let width = Math.abs(this.iSX - event.x);
  let height = Math.abs(this.iSY - event.y);
  this.select.style.width = width + 'px';
  this.select.style.height = height + 'px';
  this.select.style.left =
    Math.abs(parseInt(this.htmlElement.style.left)) + this.iSX + 'px';
  this.select.style.top = this.iSY + 'px';
  this.select.style.position = 'absolute';
  this.select.style.border = ' 1px dashed blue';
}



  previousTouch: any;
  ngAfterViewInit() {
    if (this.TaskViewerBoard) {
      this.dragService.viewBoard = this.TaskViewerBoard.nativeElement;
      //set view in the center
  
      this.TaskViewerBoard.nativeElement.style.left = this.dragService.currentBardPos.x + 'px';
      this.TaskViewerBoard.nativeElement.style.top = this.dragService.currentBardPos.y + 'px';
  
      this.TaskViewerBoard.nativeElement.addEventListener(
        'touchmove',
        (event: any) => {
          event.preventDefault();
          if (this.isModalOpen) return;
          var touch = event.targetTouches[0];
          if (this.previousTouch) {
            event.movementY = touch.pageY - this.previousTouch.pageY;
            event.movementX = touch.pageX - this.previousTouch.pageX;
          }
          if (this.dragService.Tasks) {
            if (this.previousTouch) {
              this.dragService.moveSelectedHTMLElement({
                x: event.movementX / this.dragService.currentZoom,
                y: event.movementY / this.dragService.currentZoom,
              });
            }
          } 
          if (!this.dragService.Tasks) {
            if (this.previousTouch) {
             
              this.dragService.setBoardPos({
                x: parseInt(this.TaskViewerBoard!.nativeElement.style.left) + event.movementX,
                y: parseInt(this.TaskViewerBoard!.nativeElement.style.top) + event.movementY,
              });
            }
          }
          this.previousTouch = touch;
        }
      );

      this.TaskViewerBoard.nativeElement.addEventListener(
        'mousemove',
        (event: any) => {
          if (this.isModalOpen) return;
          if (this.dragService.Tasks) {

            this.setTaskInTasklistPos()

            this.dragService.moveSelectedHTMLElement({
              x: event.movementX / this.dragService.currentZoom,
              y: event.movementY / this.dragService.currentZoom,
            });

            this.checkPos()

          } else if (this.isselect && this.isselectM) {
            this.createSelect(event);
          }
          if (this.mouseDown) {
            this.dragService.setBoardPos({
              x: parseInt(this.TaskViewerBoard!.nativeElement.style.left) + event.movementX,
              y: parseInt(this.TaskViewerBoard!.nativeElement.style.top) + event.movementY,
            });
          }
        }
      );
      this.elRef.nativeElement.addEventListener('touchend', (event: any) => {
        if(!this.dragService.Tasks) return;
        this.setElement();
        delete this.previousTouch;
      
      });
      this.elRef.nativeElement.addEventListener('mouseup', (event: any) => {
        this.iMX = 0;
        this.iMY = 0;
        this.mouseDown = false;
        this.isMoving = false;
        this.isselectM = false;
        if (this.dragService.Tasks) {
          this.setElement();
        };
        this.drawLines(true);
      });
      this.drawLines(false);
    }
  }
  taskListHightlighted?:TaskList;
  checkPos(){
    let taskList = this.taskviewerService.getTaskListsAtPosition(this.dragService.Tasks.pos);
    if(taskList)this.taskListHightlighted =taskList;
    else {
      this.taskListHightlighted?.htmlElement.getElementsByClassName("dropBox")[0].classList.remove("hoverdover");
      delete this.taskListHightlighted
    }
    if(this.taskListHightlighted)this.taskListHightlighted?.htmlElement.getElementsByClassName("dropBox")[0].classList.add("hoverdover");
  }


  setElement(){
    this.dragService.Tasks.htmlElement!.style.position = 'absolute';
    this.dragService.Tasks.htmlElement!.style.left = +this.dragService.Tasks.pos.x + 'px';
    this.dragService.Tasks.htmlElement!.style.top = +this.dragService.Tasks.pos.y + 'px';
    if (this.dragService.Tasks.isInTaskList) {
      this.dragService.Tasks.htmlElement!.style.position = 'relative';
      this.dragService.Tasks.htmlElement!.style.left = '0';
      this.dragService.Tasks.htmlElement!.style.top = '0';
      this.dragService.Tasks.htmlElement!.style.zIndex = '0';
    }
    this.dragService.getPlaceOfDropped();
    this.dragService.clearSelectedHTMLElement();
  }

  setTaskInTasklistPos(){
  if (this.dragService.Tasks.isInTaskList) {
    let tasklist = this.taskviewerService.globalTaskLists;
    for (let i = 0; i < tasklist.length; i++) {
      if (tasklist[i].id == this.dragService.Tasks.taskListId) {
        this.dragService.Tasks.pos = {
          x:
            tasklist[i].pos.x +
            this.dragService.Tasks.htmlElement!.offsetLeft,
          y:
            tasklist[i].pos.y +
            this.dragService.Tasks.htmlElement!.offsetTop,
        };
        this.taskviewerService
          .getFromGlobalTasksList(this.dragService.Tasks.taskListId)
          ?.removeFromList(this.dragService.Tasks.id);
        this.dragService.Tasks.removeTaskListId();
        this.taskviewerService.addToGlobalTasks(
          this.dragService.Tasks
        );
      }
    }
  }
}

  drawLines(clear:boolean){
    let c = <HTMLCanvasElement>document.getElementById('canvas');
    c.width = this.htmlElement.clientWidth;
    c.height = this.htmlElement.clientHeight;
    var ctx = c.getContext('2d')!;
    if(clear) ctx.clearRect(0, 0, c.width, c.height);
    for (let i = 0; i < this.taskLists.length; i++) {
      if (this.taskLists[i].relatesTo != undefined) {
        ctx.moveTo(
          this.taskLists[i].pos.x + this.taskLists[i].htmlElement.clientWidth,
          this.taskLists[i].pos.y +
            this.taskLists[i].htmlElement.clientHeight / 2
        );
        ctx.lineTo(
          this.taskLists[i].relatesTo!.pos.x +
            this.taskLists[i].relatesTo!.htmlElement.clientWidth / 2,
          this.taskLists[i].pos.y +
            this.taskLists[i].htmlElement.clientHeight / 2
        );
        ctx.lineTo(
          this.taskLists[i].relatesTo!.pos.x +
            this.taskLists[i].relatesTo!.htmlElement.clientWidth / 2,
          this.taskLists[i].relatesTo!.pos.y
        );
        ctx.stroke();
      }
    }
  }



}
