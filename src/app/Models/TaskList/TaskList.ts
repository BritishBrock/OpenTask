import { TasklistComponent } from "../../components/tasklist/tasklist.component";
import { Task } from "../Task/Task";

export class TaskList{
    
    tasks:Map<Number,Task> =  new Map<number,Task>();
    
    constructor(){
        this.component = TasklistComponent
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