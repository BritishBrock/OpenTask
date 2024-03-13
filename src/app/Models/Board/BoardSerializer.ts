import { NoteSerializer } from "../Note/NoteSerializer";
import { TaskSerializer } from "../Task/TaskSerializer";
import { TaskListSerializer } from "../TaskList/TaskListSerializer";
import { StickyNoteSerializer } from "../stickyNote/StickyNoteSerializer";
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
            newBoard.boardTaskLists =   TaskListSerializer.DeSerialize(boardJsonArray[i].boardTaskLists);
            newBoard.boardTasks =    TaskSerializer.DeSerialize(boardJsonArray[i].boardTasks);
            newBoard.boardStickyNotes =    StickyNoteSerializer.DeSerialize(boardJsonArray[i].boardStickyNotes);
            newBoard.boardNotes =   NoteSerializer.DeSerialize(boardJsonArray[i].boardNotes);
            newBoard.name =    boardJsonArray[i].name;
            newBoard.boardOffset =    boardJsonArray[i].boardOffset;
            newBoard.isStarred =    boardJsonArray[i].isStarred;
            boardArray.push(newBoard)

        }
        return boardArray;
    }
}