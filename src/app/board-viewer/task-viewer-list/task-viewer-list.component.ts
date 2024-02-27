import { Component } from '@angular/core';
import { TaskViewerBoardService } from '../../Services/taskViewerBoard/task-viewer-board.service';
import { Task } from '../../Models/Task/Task';
import { TaskList } from '../../Models/TaskList/TaskList';

@Component({
  selector: 'app-task-viewer-list',
  templateUrl: './task-viewer-list.component.html',
  styleUrl: './task-viewer-list.component.scss'
})
export class TaskViewerListComponent {
  
  constructor(private TaskViewerBoardService:TaskViewerBoardService){}
  menuSelected:string = "task";
  tasks:Task[]= []
  taskLists:TaskList[]= []
  ngOnInit(){
    this.tasks = this.TaskViewerBoardService.globalTasks;
    this.taskLists = [...this.TaskViewerBoardService.globalTaskLists];
    for(let i = 0;i < this.TaskViewerBoardService.globalTaskLists.length;i++){
      for(let y = 0; y < this.TaskViewerBoardService.globalTaskLists[i].tasks.length;y++){
        this.tasks.push(this.TaskViewerBoardService.globalTaskLists[i].tasks[y])
      }
    }  
    this.tasks = this.tasks.sort((x,x2)=>x.creationDate - x2.creationDate )
  }

  orderType:number = 0;
  OrderList(){
    switch(this.orderType+""){
      case "0":
        this.tasks = this.tasks.sort((x,x2)=>x.creationDate - x2.creationDate )
      break;
      case "1":
        this.tasks = this.tasks.sort((x,x2)=>x2.creationDate -x.creationDate   )   
      break;
      default:
        break;
    }
     
  }


  deleteTask(task:Task){
    for(let i = 0 ; i < this.tasks.length;i++){
      if(this.tasks[i].id == task.id)this.tasks.splice(i,1)
    }
  }
  duplicateTask(task:Task){
    for(let i = 0 ; i < this.tasks.length;i++){
      if(this.tasks[i].id == task.id){
        

        let newTask = new Task(task.name);
         newTask.cardColorTagType = task.cardColorTagType;
         newTask.colorTag = task.colorTag;
         newTask.descripcion =   task.descripcion;
         newTask.endDate =  task.endDate;
         newTask.startDate = task.startDate ;
         newTask.taskListId =   task.taskListId ;
         newTask.isInTaskList =  task.isInTaskList ; 
         newTask.pos = {x:0,y:0};
        if(newTask.isInTaskList){
          this.TaskViewerBoardService.getFromGlobalTasksList(newTask.taskListId!)?.tasks.push(newTask)
        }else{
          this.tasks.push(newTask)
        }



      }

    }
  }
}
