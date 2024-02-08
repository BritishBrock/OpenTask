import { Board } from "./Board";




export class BoardSerializer{
    boardPropertyMapper = {};
    static Serialize(){

    }
    static DeSerialize(boardJson:JSON){
        let boardJsonArray = Object.values(boardJson);
        let boardArray:Board[] = []
        for(let i = 0; i < boardJsonArray.length;i++){
            let newBoard = new Board(boardJsonArray[i].id);
            newBoard.boardTaskLists =    boardJsonArray[i].boardTaskLists;
            newBoard.boardTasks =    boardJsonArray[i].boardTasks;
            boardArray.push(newBoard)
        }
        return boardArray;
    }
}