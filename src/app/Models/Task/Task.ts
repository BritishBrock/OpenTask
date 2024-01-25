import { TaskComponent } from "../../components/task/task.component";

export class Task{
    id:number;
    name:string;
    colorTag:string;
    component;
    htmlElement!:HTMLElement;
    constructor(id:number,name:string,colorTag:string){
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
}