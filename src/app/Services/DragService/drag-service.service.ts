import { ElementRef, Injectable } from '@angular/core';
import { Coord } from '../../interfaces/Coord/Coord';

@Injectable({
  providedIn: 'root'
})
export class DragServiceService {

  constructor() { }

  Tasks?:any;
  
  selectHTMLElement(element:any){
    this.Tasks = element;
  }

  moveSelectedHTMLElement(newCoord:Coord){
    
    if(!this.Tasks)return;
  
    this.Tasks.htmlElement.style.left =    newCoord.x  -(this.Tasks.htmlElement.offsetWidth /2)     + "px";
    this.Tasks.htmlElement.style.top = newCoord.y  -(this.Tasks.htmlElement.offsetHeight/2)  +  "px";
    console.log(this.Tasks.htmlElement.style.left)
  }
  clearSelectedHTMLElement(){
    this.Tasks = undefined;
  }
  
    


}
