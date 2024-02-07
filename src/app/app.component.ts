import { Component } from '@angular/core';
import { BoardService } from './Services/board/board.service';
import { Board } from './Models/Board/Board';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'OpenTask';

boards:Board[] = [];
  constructor(private boardService:BoardService){}

ngOnInit(){
  this.boards = this.boardService.globalBoards
}

  addBoard(){
    this.boardService.addEmptyBoard();
  }
}
