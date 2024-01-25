import { TasklistComponent } from "../../components/tasklist/tasklist.component";
import { Coord, Size } from "../../interfaces/Coord/Coord";
import { Task } from "../Task/Task";

export class TaskList{
    
    tasks:Map<Number,Task> =  new Map<number,Task>();
    pos:Coord;
    constructor(){
        this.component = TasklistComponent;
        this.pos = {x:0,y:0}
    }
    component;
    htmlElement!:HTMLElement;
    addTaskToList(task:Task){
        this.tasks.set(task.id,task);
    }
    getTaskFromList(id:number){
        this.tasks.get(id);
    }
    setHtmlElement(htmlElement:HTMLElement){
        this.htmlElement = htmlElement;
    }
}