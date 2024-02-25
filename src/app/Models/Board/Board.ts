import { Task } from "../Task/Task";
import { TaskList } from "../TaskList/TaskList";
import { StickyNote } from "../stickyNote/stickyNote";

export class Board{
    static totalNumber:number = 0;
    id:number;
    boardTasks:Task[] = [];
    name:string = "board";
    boardTaskLists:TaskList[] = [];
    boardStickyNotes:StickyNote[] = [];
    isStarred:boolean= false;
    constructor(id?:number){
        this.id = id ?? Board.totalNumber;
        Board.totalNumber++;
    }
}