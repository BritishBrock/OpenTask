import { Note } from "./Note";

export class NoteSerializer{
static Serialize(){

}
static DeSerialize(TaskJson:JSON){
    let NoteJsonArray = Object.values(TaskJson);
    let noteArray:Note[] = []
    for(let i = 0; i < NoteJsonArray.length;i++){
        let newNote:any = new Note(NoteJsonArray[i].name,NoteJsonArray[i].id);
        Object.entries(NoteJsonArray[i]).every(([key,value])=>{
            newNote[key as keyof typeof newNote] = value;
            return true;
        })
        noteArray.push(newNote)
    }
    return noteArray;
}
}