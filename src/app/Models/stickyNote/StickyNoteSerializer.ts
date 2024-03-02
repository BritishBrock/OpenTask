import { TaskSerializer } from "../Task/TaskSerializer";
import { StickyNote } from "./stickyNote";


export class StickyNoteSerializer{
    static excludeList:string[] = ["htmlElement"] as const; 
    static Serialize(){

    }
    static DeSerialize(boardJson:JSON){
        let taskListJsonArray = Object.values(boardJson);
        let stickyNoteArray:StickyNote[] = []
        for(let i = 0; i < taskListJsonArray.length;i++){
            let newStickyNote:any = new StickyNote(taskListJsonArray[i].id);
            Object.entries(taskListJsonArray[i]).every(([key,value])=>{
                if(!this.excludeList.includes(key)){
                    newStickyNote[key as keyof typeof newStickyNote] = value;
                }
                return true;
            })
            stickyNoteArray.push(newStickyNote)
        }
        return stickyNoteArray;
    }
}