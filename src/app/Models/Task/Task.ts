import { TaskComponent } from "../../components/task/task.component";
import { Coord } from "../../interfaces/Coord/Coord";

export class Task{
    id:number;
    name:string;
    colorTag:string;
    component;
    htmlElement?:HTMLElement;
    pos:Coord;
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
    removeHtmlElement(){
        this.htmlElement?.remove()
        this.htmlElement = undefined;
    }
}