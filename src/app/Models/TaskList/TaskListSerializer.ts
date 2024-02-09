import { TaskSerializer } from "../Task/TaskSerializer";
import { TaskList } from "./TaskList";


export class TaskListSerializer{
    boardPropertyMapper = {};
    static Serialize(){

    }
    static DeSerialize(boardJson:JSON){
        let taskListJsonArray = Object.values(boardJson);
        let taskListArray:TaskList[] = []
        for(let i = 0; i < taskListJsonArray.length;i++){
            let newTaskList = new TaskList(taskListJsonArray[i].id);
            newTaskList.tasks =  TaskSerializer.DeSerialize(taskListJsonArray[i].tasks);
            taskListArray.push(newTaskList)
        }
        return taskListArray;
    }
}