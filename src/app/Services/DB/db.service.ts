import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { Board } from '../../Models/Board/Board';
import { BoardService } from '../board/board.service';

@Injectable({
  providedIn: 'root',
})
export class DBService {
  constructor( private boardService: BoardService,) {}
  dbCompelte:Subject<any>= new Subject<any>();
  db: any;
  loadBoards() {
    const request =this.db
  .transaction("boards")
  .objectStore("boards")
  .getAll()

    return request;
  }

  storeBoards(boards:Board[]) {
    this.deleteBoards().onsuccess =()=>{
      let transaction = this.db.transaction("boards", "readwrite"); 


      let Boards = transaction.objectStore("boards"); 
      
      for(let i = 0; i < boards.length;i++){
        let request = Boards.add(JSON.parse(JSON.stringify(boards[i]))); 
        request.onsuccess = function() { 
          console.log("Se guardo el board", request.result);
        };
        
        request.onerror = function() {
          console.log("Error", request.error);
        };
      }
    }
  }

  deleteBoards(){
    const request = this.db
      .transaction(["boards"], "readwrite")
      .objectStore("boards")
      .clear();
      return request
  }



  openRequest:any;
   openDB() {
    if(this.db)return;
     let openRequest = indexedDB.open('OpenTask',1);

    openRequest.onupgradeneeded =  ()=> {
      let db = openRequest.result;
      if (!db.objectStoreNames.contains('boards')) { 
        db.createObjectStore('boards', { autoIncrement: true }); 
      }
    };

    openRequest.onerror = function () {
      console.error('Error', openRequest.error);
    };

    openRequest.onsuccess =  ()=> {
       this.db = openRequest.result;
       this.dbCompelte.next(true)
       const int = setInterval(() => {
        this.storeBoards(this.boardService.globalBoards); 
      }, 10000);
    };


  }
}
