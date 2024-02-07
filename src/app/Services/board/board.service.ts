import { Injectable } from '@angular/core';
import { Board } from '../../Models/Board/Board';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor() { }

  globalBoards:Board[] = [];


  addEmptyBoard(){
    this.globalBoards.push(new Board(Board.totalNumber));
    Board.totalNumber++;
    console.log(this.globalBoards);
  }


}
