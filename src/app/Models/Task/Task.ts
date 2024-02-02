import { TaskComponent } from "../../components/task/task.component";
import { Coord } from "../../interfaces/Coord/Coord";

export class Task{
    id:number;
    name:string;
    colorTag:string;
    component;
    htmlElement?:HTMLElement;
    pos:Coord;
    taskListId?:number;
    isInTaskList:boolean = false;
    descripcion?:string;
    constructor(id:number,name:string,colorTag:string){
        this.pos = {x:0,y:0}
        this.id = id;
        this.name= name;
        this.colorTag = colorTag;
        this.component = TaskComponent
       
    }
    changeColorTag(){

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
}