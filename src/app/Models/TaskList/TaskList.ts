import { Task } from "../Task/Task";

export class TaskList{
    
    tasks:Map<Number,Task> =  new Map<Number,Task>();
    
    constructor(){}

    addTaskToList(task:Task){
        this.tasks.set(task.id,task);
    }
    getTaskFromList(id:Number){
        this.tasks.get(id);
    }
}