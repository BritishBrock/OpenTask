import { TaskComponent } from "../../components/task/task.component";
import { Coord } from "../../interfaces/Coord/Coord";

export class Task{
    static lastID:number = 0; 
    id:number;
    name:string;
    colorTag:string;
    component;
    htmlElement?:HTMLElement;
    pos:Coord;
    taskListId?:number;
    isInTaskList:boolean = false;
    descripcion?:string;
    cardColorTagType:number = 0;
    endDate?:Date;
    startDate?:Date;
    constructor(name:string,id?:number,){
        this.pos = {x:0,y:0}
        this.id = id ?? Task.lastID++;
        this.name= name;
        this.colorTag = this.generateColor();
        this.component = TaskComponent
       
    }

    setHtmlElement(htmlElement:HTMLElement){
        this.htmlElement = htmlElement;
    }

    setTaskListId(id:number){
        this.taskListId = id;
        this.isInTaskList = true;
    }
    removeTaskListId(){
        this.isInTaskList = false;
        delete this.taskListId;
    }
    removeHmtl(){
        delete this.htmlElement;
    }
    generateColor():string{
        let char = "123456789ABCDEF";
        let hexCol = "#";
        for(let i = 0; i < 6; i++){
          hexCol += char.charAt(Math.floor(Math.random() * char.length));
        }
        return hexCol;
      }
}