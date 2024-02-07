import { Injectable } from '@angular/core';
import { Board } from '../../Models/Board/Board';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor() { }

  globalBoards:Board[] = [];
  activeBoard?:Board;

  addEmptyBoard(){
    this.globalBoards.push(new Board(Board.totalNumber));
    Board.totalNumber++;
    console.log(this.globalBoards);
  }


  setActiveBoard(boardId:number){
    for(let i = 0; i < this.globalBoards.length;i++){
      if(this.globalBoards[i].id == boardId) this.activeBoard = this.globalBoards[i];
    }
  }



}
