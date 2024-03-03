import { Coord } from "../../interfaces/Coord/Coord";

export class Note{
    type="task";
    id:number;
    title:string;
    pos?:Coord;
    descripcion?:string;
    span?:string;
    creationDate:number;
    constructor(title:string,id?:number,){
        this.id = Math.floor(Math.random()*100000000000000);
        this.title= title;
        this.creationDate = Date.now();
    }
}