import { Task } from "../Task/Task";

export class TaskList{
    
    tasks:Map<Number,Task> =  new Map<number,Task>();
    
    constructor(){}

    addTaskToList(task:Task){
        this.tasks.set(task.id,task);
    }
    getTaskFromList(id:number){
        this.tasks.get(id);
    }
    
}