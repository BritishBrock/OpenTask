import { Component, ElementRef, Input } from '@angular/core';
import { TaskList } from '../../Models/TaskList/TaskList';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  @Input() taskList!:TaskList;
  HtmlElement!:HTMLElement;
  constructor(private ElementRef:ElementRef){}
  ngOnInit(){
    this.HtmlElement = this.ElementRef.nativeElement;

    this.HtmlElement.style.left = this.taskList.pos.x +"px";
    this.HtmlElement.style.top = this.taskList.pos.y +"px";

  }
  
}
