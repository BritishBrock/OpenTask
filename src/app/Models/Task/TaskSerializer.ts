import { Coord } from "../../interfaces/Coord/Coord";
import { Task } from "./Task";

export class TaskSerializer{

    static excludeList:string[] = ["component","htmlElement","lastID"] as const; 

    boardPropertyMapper = {};
    static Serialize(){

    }
    static DeSerialize(TaskJson:JSON){
        let taskJsonArray = Object.values(TaskJson);
        let taskArray:Task[] = []
        for(let i = 0; i < taskJsonArray.length;i++){
            let newTask:any = new Task(taskJsonArray[i].name,taskJsonArray[i].id);
            Object.entries(taskJsonArray[i]).every(([key,value])=>{
                if(!this.excludeList.includes(key)){
                    newTask[key as keyof typeof newTask] = value;
                }
                return true;
            })
            taskArray.push(newTask)
        }
        return taskArray;
    }
}