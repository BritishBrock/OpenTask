import { TasklistComponent } from "../../components/tasklist/tasklist.component";
import { Coord, Size } from "../../interfaces/Coord/Coord";
import { Task } from "../Task/Task";

export class TaskList{
    
    tasks:Map<Number,Task> =  new Map<number,Task>();
    pos:Coord;
    id:number;
    constructor(id:number){
        this.id = id;
        this.component = TasklistComponent;
        this.pos = {x:0,y:0}
    }
    component;
    htmlElement!:HTMLElement;
    addTaskToList(task:Task){
        console.log(task.id)
        this.tasks.set(task.id,task);
        console.log(this.tasks)
    }
    getTaskFromList(id:number){
        this.tasks.get(id);
    }
    removeFromList(id:number){
        this.tasks.get(id)?.removeHtmlElement();
        this.tasks.delete(id);
    }
    setHtmlElement(htmlElement:HTMLElement){
        this.htmlElement = htmlElement;
    }
}