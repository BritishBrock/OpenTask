import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Coord } from '../../interfaces/Coord/Coord';

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {
  isOpen:Subject<boolean> = new Subject<boolean>();
  displayOfContextMenu:Subject<Coord> = new Subject<Coord>();
  _isOpen:boolean = false;
  constructor() { }

  switchContextMenu(){
    this._isOpen = !this._isOpen;
    this.isOpen.next(this._isOpen)
  }


  changeDisplayOfContextMenu(coords:Coord){
    this.displayOfContextMenu.next(coords);
  }
  
}
