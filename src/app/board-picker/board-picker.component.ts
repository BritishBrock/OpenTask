import { Component } from '@angular/core';
import { Board } from '../Models/Board/Board';
import { BoardService } from '../Services/board/board.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { BoardSerializer } from '../Models/Board/BoardSerializer';
import { Task } from '../Models/Task/Task';
import { TaskList } from '../Models/TaskList/TaskList';
import { DBService } from '../Services/DB/db.service';

@Component({
  selector: 'app-board-picker',
  templateUrl: './board-picker.component.html',
  styleUrl: './board-picker.component.scss'
})
export class BoardPickerComponent {

  boards:Board[] = [];
  file?:File;
  constructor(private boardService:BoardService,private Router:Router,private sanitizer: DomSanitizer,private DBService:DBService){}
  dbLoaded =false;
ngOnInit(){
  this.boards = this.boardService.globalBoards;
  // this.save();
  this.DBService.openDB();
  this.DBService.dbCompelte.subscribe((data)=>{
    
    this.dbLoaded = data;
    this.DBService.loadBoards().onsuccess= (event:any) => {
      let boards = event.target.result;
      
        for(let i = 0;i < boards.length;i++){
          if(this.boards.length == 0) this.boards = [...boards]
          for(let y = 0; y < this.boards.length;y++){
            if(this.boards[y].id != boards[i].id)this.boards.push(boards[i]);
          }
      }
  };
  })



  setInterval(()=>{
    this.DBService.storeBoards(this.boards);
  },60000)


}
  selectBoard(boardId:number){
    if(this.boardService.setActiveBoard(boardId))this.Router.navigateByUrl(boardId+"");
    
  }
  addBoard(){
    this.boardService.addEmptyBoard();
  }


  saveBoards(){
    this.DBService.storeBoards(this.boards);
  }
  deleteBoards(){
    this.DBService.deleteBoards();
  }

// checking:any;

//   check(event:any){
//     let file = event.target.files[0]
//     let fileReader = new FileReader();
//     fileReader.onload = (e:any) => {
//       this.checking = fileReader.result;

//       this.boards.push(...BoardSerializer.DeSerialize(JSON.parse(this.checking)))


//       this.save()
//     }
//     fileReader.readAsText(file);

//   }
//   fileUrl:any
//   save(){
//     const data = this.checking;
//     const blob = new Blob([JSON.stringify(this.boards)], {
//       type: 'json'
//   });
//   this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
//   }




}
