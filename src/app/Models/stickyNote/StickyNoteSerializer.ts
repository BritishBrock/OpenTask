import { TaskSerializer } from "../Task/TaskSerializer";
import { StickyNote } from "./stickyNote";


export class StickyNoteSerializer{
    static Serialize(){

    }
    static DeSerialize(boardJson:JSON){
        let taskListJsonArray = Object.values(boardJson);
        let stickyNoteArray:StickyNote[] = []
        for(let i = 0; i < taskListJsonArray.length;i++){
            let newTaskList = new StickyNote(taskListJsonArray[i].id);
            newTaskList.pos = taskListJsonArray[i].pos;
            newTaskList.color = taskListJsonArray[i].color;
            newTaskList.descripcion = taskListJsonArray[i].descripcion;
            stickyNoteArray.push(newTaskList)
        }
        return stickyNoteArray;
    }
}