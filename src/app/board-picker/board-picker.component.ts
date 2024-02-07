import { Component } from '@angular/core';
import { Board } from '../Models/Board/Board';
import { BoardService } from '../Services/board/board.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-picker',
  templateUrl: './board-picker.component.html',
  styleUrl: './board-picker.component.scss'
})
export class BoardPickerComponent {

  boards:Board[] = [];
  constructor(private boardService:BoardService,private Router:Router){}

ngOnInit(){
  this.boards = this.boardService.globalBoards
}
  selectBoard(boardId:number){
    this.boardService.setActiveBoard(boardId);
    this.Router.navigateByUrl(boardId+"");
  }
  addBoard(){
    this.boardService.addEmptyBoard();
  }
}
