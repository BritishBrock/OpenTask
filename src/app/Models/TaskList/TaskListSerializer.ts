import { TaskSerializer } from "../Task/TaskSerializer";
import { TaskList } from "./TaskList";


export class TaskListSerializer{
    boardPropertyMapper = {};
    static excludeList:string[] = ["component","htmlElement","lastID","tasks"] as const; 
    static Serialize(){

    }
    static DeSerialize(boardJson:JSON){
        let taskListJsonArray = Object.values(boardJson);
        let taskListArray:TaskList[] = []
        for(let i = 0; i < taskListJsonArray.length;i++){
            let newTaskList:any = new TaskList(taskListJsonArray[i].id);
            newTaskList.tasks =  TaskSerializer.DeSerialize(taskListJsonArray[i].tasks);
            Object.entries(taskListJsonArray[i]).every(([key,value])=>{
                if(!this.excludeList.includes(key)){
                    newTaskList[key as keyof typeof newTaskList] = value;
                }
                return true;
            })
            taskListArray.push(newTaskList)  
        }
        return taskListArray;
    }
}