import { Component, ElementRef, Input } from '@angular/core';
import { Task } from '../../Models/Task/Task';
import { DragServiceService } from '../../Services/DragService/drag-service.service';
import { ContextMenuService } from '../../Services/ContextMenu/context-menu.service';
import { Coord } from '../../interfaces/Coord/Coord';
import { TaskModalService } from '../../Services/task-modal.service';
import { TaskViewerBoardService } from '../../Services/taskViewerBoard/task-viewer-board.service';
import { detectDoubleTapClosure } from '../../event/customEvents/doubleTapEvent';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  @Input() task!: Task;
  @Input() isInModal?: boolean;
  nativeElement?: HTMLElement;

  isTaskModalOpen: boolean = false;

  constructor(
    private elRef: ElementRef,
    private DragService: DragServiceService,
    private ContextMenuService: ContextMenuService,
    private taskModalService: TaskModalService,
    private taskViewerService: TaskViewerBoardService
  ) {
    this.nativeElement = this.elRef.nativeElement;
  }
  ngOnInit() {
    if (this.isInModal) return;

    this.nativeElement!.addEventListener('touchend', (event: any) => {
      this.lastTap = detectDoubleTapClosure(this.lastTap,this.taskModalService.taskModal,this.task)
      this.DragService.Tasks.htmlElement!.style.position = 'absolute';
      this.DragService.Tasks.htmlElement!.style.left = +this.DragService.Tasks.pos.x + 'px';
      this.DragService.Tasks.htmlElement!.style.top = +this.DragService.Tasks.pos.y + 'px';
      if (this.DragService.Tasks.isInTaskList) {
        this.DragService.Tasks.htmlElement!.style.position = 'relative';
        this.DragService.Tasks.htmlElement!.style.left = '0';
        this.DragService.Tasks.htmlElement!.style.top = '0';
        this.DragService.Tasks.htmlElement!.style.zIndex = '0';
      }
      this.previousTouch = null;
      this.DragService.getPlaceOfDropped();
      this.DragService.clearSelectedHTMLElement();
    });
    this.nativeElement!.addEventListener(
      'touchmove',
      (event: any) => {
        
        if(!this.DragService.Tasks) return;
        event.preventDefault();
        var touch = event.targetTouches[0];
        
        if (this.previousTouch) {
          
          event.movementY = touch.pageY - this.previousTouch.pageY;
          event.movementX = touch.pageX - this.previousTouch.pageX;
        }
          if (this.previousTouch) {
            this.setTaskInTasklistPos()
            this.DragService.moveSelectedHTMLElement({
              x: event.movementX / this.DragService.currentZoom,
              y: event.movementY / this.DragService.currentZoom,
            });
          }
        this.previousTouch = touch;
      }
    );
  }
  previousTouch:any;
  mousedown() {
    this.nativeElement!.addEventListener('touchstart', (event: any) => {
      event.preventDefault();
      if (!this.DragService.Tasks){
        
        this.DragService.selectHTMLElement(this.task);
      } 
        
    });
  }
  setTaskInTasklistPos(){
    if (this.DragService.Tasks.isInTaskList) {
     
      let tasklist = this.taskViewerService.globalTaskLists;
      for (let i = 0; i < tasklist.length; i++) {
        if (tasklist[i].id == this.DragService.Tasks.taskListId) {
          this.DragService.Tasks.pos = {
            x:
              tasklist[i].pos.x +
              this.DragService.Tasks.htmlElement!.offsetLeft,
            y:
              tasklist[i].pos.y +
              this.DragService.Tasks.htmlElement!.offsetTop,
          };
          this.taskViewerService
            .getFromGlobalTasksList(this.DragService.Tasks.taskListId)
            ?.removeFromList(this.DragService.Tasks.id);
          this.DragService.Tasks.removeTaskListId();
          this.taskViewerService.addToGlobalTasks(
            this.DragService.Tasks
          );
        }
      }
    }
  }
  openTaskModal() {
    this.taskModalService.taskModal.next(this.task);
  }

  ngAfterViewInit() {
    this.nativeElement!.addEventListener('mousedown', (event: any) => {
      switch (event.which) {
        case 1:
          if (this.ContextMenuService._isOpen)
            this.ContextMenuService.switchContextMenu();
          if (!this.DragService.Tasks) {
           

            this.DragService.selectHTMLElement(this.task);
          }
          break;
        case 2:
          break;
        case 3:
          break;
      }
    });
  }
  doubleClick() {
    this.taskModalService.taskModal.next(this.task);
  }

  lastTap = 0;

  ngOnChanges() {
    this.nativeElement!.style.position = 'absolute';

    this.nativeElement!.style.left = this.task.pos.x + 'px';
    this.nativeElement!.style.top = this.task.pos.y + 'px';

    if (this.task.isInTaskList || this.isInModal) {
      this.nativeElement!.style.position = 'relative';
      this.nativeElement!.style.left = '0';
      this.nativeElement!.style.top = '0';
      this.nativeElement!.style.zIndex = '0';
    }

    if (this.nativeElement && !this.isInModal) {
      this.task.setHtmlElement(this.nativeElement);

      this.mousedown();
    }
  }
}
