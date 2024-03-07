import { Coord } from "../../interfaces/Coord/Coord";
import { Note } from "../Note/Note";
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
    boardNotes:Note[] = [];
    boardOffset:Coord = {x:0,y:0}
    isStarred:boolean= false;
    constructor(id?:number){
        this.id = id ?? Math.floor(Math.random()*100000000000000);
    }
}