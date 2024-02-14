import { Coord } from "../../interfaces/Coord/Coord";
import { Task } from "./Task";

export class TaskSerializer{
    boardPropertyMapper = {};
    static Serialize(){

    }
    static DeSerialize(TaskJson:JSON){
        let taskJsonArray = Object.values(TaskJson);
        let taskArray:Task[] = []
        for(let i = 0; i < taskJsonArray.length;i++){
            let newTask = new Task(taskJsonArray[i].id,taskJsonArray[i].name,taskJsonArray[i].colorTag);
            newTask.isInTaskList = taskJsonArray[i].isInTaskList;
            newTask.taskListId = taskJsonArray[i].taskListId;
            newTask.pos = taskJsonArray[i].pos as Coord;
            taskArray.push(newTask)
        }
        return taskArray;
    }
}