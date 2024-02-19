import { TasklistComponent } from "../../components/tasklist/tasklist.component";
import { Coord, Size } from "../../interfaces/Coord/Coord";
import { Task } from "../Task/Task";

export class TaskList{
    static lastID:number = 0; 
    tasks:Task[] = [];
    pos:Coord;
    id:number;
    relatesTo?:TaskList;
    title:string
    constructor(id?:number){
        this.id =   TaskList.lastID++;
        this.component = TasklistComponent;
        this.pos = {x:0,y:0}
        this.title = `Example text (${this.id})`
    }
    component;
    htmlElement!:HTMLElement;
    addTaskToList(task:Task){

        this.tasks.push(task)
    }
    getTaskFromList(id:number){
        for(let i = 0; i < this.tasks.length;i++){
            if(this.tasks[i].id == id){
              return this.tasks[i];
            }
          }
          return undefined;
    }
    removeFromList(id:number){
        for(let i = 0; i < this.tasks.length;i++){
            if(this.tasks[i].id == id){
                this.tasks.splice(i, 1);
            }
          }
    }
    setHtmlElement(htmlElement:HTMLElement){
        this.htmlElement = htmlElement;
    }
}