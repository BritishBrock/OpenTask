import { TaskComponent } from "../../components/task/task.component";

export class Task{
    id:number;
    name:string;
    colorTag:string;
    html;
    constructor(id:number,name:string,colorTag:string){
        this.id = id;
        this.name= name;
        this.colorTag = colorTag;
        this.html = TaskComponent
    }
    changeColorTag(){

    }
}