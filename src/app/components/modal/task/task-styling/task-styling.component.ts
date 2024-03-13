import { Component, Input } from '@angular/core';
import { Task } from '../../../../Models/Task/Task';
import { SettingsService } from '../../../../Services/settings/settings.service';

@Component({
  selector: 'app-task-styling',
  templateUrl: './task-styling.component.html',
  styleUrl: './task-styling.component.scss'
})
export class TaskStylingComponent {
  @Input() task!:Task;
  constructor(private settings:SettingsService){}
 stylingSettings = this.settings.userSettings.styling;
  cardType(opcion:number){
    this.task.cardColorTagType = opcion;
  }
  updateTaskColor($color:any){
    this.task.colorTag = $color;
  }
}
