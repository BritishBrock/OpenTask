import { ElementRef, Injectable } from '@angular/core';
import { Coord } from '../../interfaces/Coord/Coord';

@Injectable({
  providedIn: 'root'
})
export class DragServiceService {

  constructor() { }

  htmlElementSelected?:HTMLElement;
  
  selectHTMLElement(element:HTMLElement){
    this.htmlElementSelected = element;
  }

  moveSelectedHTMLElement(newCoord:Coord){
    if(!this.htmlElementSelected)return;
    console.log(this.htmlElementSelected.style.left)
    console.log(this.htmlElementSelected.offsetWidth)
    this.htmlElementSelected.style.left =    newCoord.x  -(this.htmlElementSelected.offsetWidth /2)     + "px";
    this.htmlElementSelected.style.top = newCoord.y  -(this.htmlElementSelected.offsetHeight/2)  +  "px";
    
  }
  clearSelectedHTMLElement(){
    this.htmlElementSelected = undefined;
  }
  
    


}
