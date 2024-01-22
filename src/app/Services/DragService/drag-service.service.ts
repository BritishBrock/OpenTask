import { ElementRef, Injectable } from '@angular/core';
import { Coord } from '../../interfaces/Coord/Coord';

@Injectable({
  providedIn: 'root'
})
export class DragServiceService {

  constructor() { }

  htmlElementSelected?:ElementRef;
  
  selectHTMLElement(element:ElementRef){
    this.htmlElementSelected = element;
  }

  moveSelectedHTMLElement(newCoord:Coord){
    if(!this.htmlElementSelected)return;
    console.log(this.htmlElementSelected.nativeElement.style.left)
    console.log(this.htmlElementSelected.nativeElement.offsetWidth)
    this.htmlElementSelected.nativeElement.style.left =    newCoord.x  -(parseInt(this.htmlElementSelected.nativeElement.offsetWidth)/2)     + "px";
    this.htmlElementSelected.nativeElement.style.top = newCoord.y  -(parseInt(this.htmlElementSelected.nativeElement.offsetHeight)/2)  +  "px";
    
  }
  clearSelectedHTMLElement(){
    this.htmlElementSelected = undefined;
  }
  
    


}
