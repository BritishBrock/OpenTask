import { Injectable } from '@angular/core';
import { Board } from '../../Models/Board/Board';
import { TaskViewerBoardService } from '../taskViewerBoard/task-viewer-board.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private taskViewerService:TaskViewerBoardService) { }

  globalBoards:Board[] = [];
  activeBoard?:Board;

  addEmptyBoard(){
    
    this.globalBoards.push(new Board(Board.totalNumber));
    Board.totalNumber++;
  }


  setActiveBoard(boardId:number){
    for(let i = 0; i < this.globalBoards.length;i++){
      if(this.globalBoards[i].id == boardId) this.activeBoard = this.globalBoards[i];
    }
    if(!this.activeBoard )return false;
    this.taskViewerService.globalTasks = this.activeBoard.boardTasks;
    this.taskViewerService.globalTaskLists = this.activeBoard.boardTaskLists;
    return true;
  }



}
