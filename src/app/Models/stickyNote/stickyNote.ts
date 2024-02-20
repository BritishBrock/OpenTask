import { StickyNoteComponent } from "../../components/sticky-note/sticky-note.component";
import { Coord } from "../../interfaces/Coord/Coord";


export class StickyNote{
    static lastID:number = 0; 
    id:number;
    component;
    htmlElement?:HTMLElement;
    pos:Coord;
    descripcion?:string;
    constructor(id?:number,){
        this.pos = {x:0,y:0}
        this.id = id ?? StickyNote.lastID++;
        this.component = StickyNoteComponent 
    }

    setHtmlElement(htmlElement:HTMLElement){
        this.htmlElement = htmlElement;
    }
}