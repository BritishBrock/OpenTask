import { Component } from '@angular/core';
import { Board } from '../Models/Board/Board';
import { BoardService } from '../Services/board/board.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { BoardSerializer } from '../Models/Board/BoardSerializer';
import { Task } from '../Models/Task/Task';
import { TaskList } from '../Models/TaskList/TaskList';

@Component({
  selector: 'app-board-picker',
  templateUrl: './board-picker.component.html',
  styleUrl: './board-picker.component.scss'
})
export class BoardPickerComponent {

  boards:Board[] = [];
  file?:File;
  constructor(private boardService:BoardService,private Router:Router,private sanitizer: DomSanitizer){}

ngOnInit(){
  this.boards = this.boardService.globalBoards;


  //testing

  // let b = new Board(0);
  // b.boardTasks.push(new Task(0,"rt","red"))
  // let tasklist = new TaskList(0);
  // tasklist.tasks.push(new Task(1,"f","red"))
  // b.boardTaskLists.push(tasklist)

  // console.log(JSON.stringify(b))


}
  selectBoard(boardId:number){
    if(this.boardService.setActiveBoard(boardId))this.Router.navigateByUrl(boardId+"");
    
  }
  addBoard(){
    this.boardService.addEmptyBoard();
  }

checking:any;

  check(event:any){
    let file = event.target.files[0]
    let fileReader = new FileReader();
    fileReader.onload = (e:any) => {
      this.checking = fileReader.result;

      this.boards.push(...BoardSerializer.DeSerialize(JSON.parse(this.checking)))


      this.save()
    }
    fileReader.readAsText(file);

  }
  fileUrl:any
  save(){


    const data = this.checking;
    const blob = new Blob([data], {
      type: 'json'
  });
  this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }

}
