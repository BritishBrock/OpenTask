import { Task } from "../Task/Task";
import { TaskList } from "../TaskList/TaskList";

export class Board{
    static totalNumber:number = 0;
    id:number;
    boardTasks:Task[] = [];
    boardTaskLists:TaskList[] = [];
    isStarred:boolean= false;
    constructor(id:number){
        this.id = id;
    }
}