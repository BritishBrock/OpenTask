import { StickyNoteComponent } from "../../components/sticky-note/sticky-note.component";
import { Coord } from "../../interfaces/Coord/Coord";


export class StickyNote{
    static lastID:number = 0; 
    id:number;
    component;
    htmlElement?:HTMLElement;
    pos:Coord;
    descripcion?:string;
    color:string;
    width?:string;
    zIndex:number = 3;
    height?:string;
    image?:string;
    isImageActive:boolean = false;
    constructor(id?:number,){
        this.pos = {x:0,y:0}
        this.id = id ?? StickyNote.lastID++;
        this.component = StickyNoteComponent 
        this.color = this.generateColor();
    }
    generateColor():string{
        let char = "123456789ABCDEF";
        let hexCol = "#";
        for(let i = 0; i < 6; i++){
          hexCol += char.charAt(Math.floor(Math.random() * char.length));
        }
        return hexCol;
      }
    setHtmlElement(htmlElement:HTMLElement){
        this.htmlElement = htmlElement;
    }
}