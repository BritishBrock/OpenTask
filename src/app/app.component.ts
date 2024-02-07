import { Component } from '@angular/core';
import { BoardService } from './Services/board/board.service';
import { Board } from './Models/Board/Board';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'OpenTask';

}
