import { Component } from '@angular/core';
import { Task } from '../../Models/Task/Task';
import { TaskViewerBoardService } from '../../Services/taskViewerBoard/task-viewer-board.service';

@Component({
  selector: 'app-task-viewer-calendar',
  templateUrl: './task-viewer-calendar.component.html',
  styleUrl: './task-viewer-calendar.component.scss'
})
export class TaskViewerCalendarComponent {


  constructor(private TaskViewerBoardService:TaskViewerBoardService){}

  currentYear:any;
  selectYear:any;
  selectMonth:any;
  monthAndYear:any;
  months:any;
  currentMonth:any;
  today:any;

  taskEndDates:any = {};

  addToDateMap(task:Task){
    if(Object.hasOwn(this.taskEndDates,task.endDate+"")){
      this.taskEndDates[task.endDate+""].push(task)
    }else{
      this.taskEndDates[task.endDate+""] = [];
      this.taskEndDates[task.endDate+""].push(task)
    }
  }


  ngOnInit(){
    
 

    for(let i = 0;i <this.TaskViewerBoardService.globalTasks.length;i++){
       if(this.TaskViewerBoardService.globalTasks[i].endDate) this.addToDateMap(this.TaskViewerBoardService.globalTasks[i])
    }  
    for(let i = 0;i < this.TaskViewerBoardService.globalTaskLists.length;i++){
      for(let y = 0; y < this.TaskViewerBoardService.globalTaskLists[i].tasks.length;y++){
        if(this.TaskViewerBoardService.globalTaskLists[i].tasks[y].endDate) this.addToDateMap(this.TaskViewerBoardService.globalTaskLists[i].tasks[y])
      }
    }  

  



    this.today = new Date();
    this.currentMonth = this.today.getMonth();
    this.currentYear = this.today.getFullYear();
 
    this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
   
 
   this.showCalendar(this.currentMonth, this.currentYear);


   this.addTasksToCalender();



  }


  addTasksToCalender(){
    Object.entries(this.taskEndDates).every(([key,values])=>{

      if(this.currentMonth == new Date(key).getMonth() && this.currentYear == new Date(key).getFullYear()){
        let value:any = values;
        if(value.length == 1){
          document.getElementById("C-"+new Date(key).getDate())!.textContent += value[0].name;
        }
      }
      return true;
    })
  }

   next() {
    this.currentYear = (this.currentMonth === 11) ? this.currentYear + 1 : this.currentYear;
    this.currentMonth = (this.currentMonth + 1) % 12;
    this.showCalendar(this.currentMonth, this.currentYear);
}

 previous() {
  this.currentYear = (this.currentMonth === 0) ? this.currentYear - 1 : this.currentYear;
  this.currentMonth = (this.currentMonth === 0) ? 11 : this.currentMonth - 1;
  this.showCalendar(this.currentMonth, this.currentYear);
}

 jump(year:any,month:any) {
  this.currentYear = parseInt(year);
    this.currentMonth = parseInt(month);
    this.showCalendar(this.currentMonth, this.currentYear);
}


 showCalendar(month:any, year:any) {

  let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar
    // clearing all previous cells
    tbl!.innerHTML = "";

    // filing data about month and in the page via DOM.

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("div");
        row.classList.add("calRow")

        //creating individual cells, filing them up with data.
        for (let j = 1; j < 8; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("div");
                let cellText = document.createTextNode("");
                cell.classList.add("tableCell")
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
              let cell = document.createElement("div");
              let cellText = document.createTextNode(date +"");
              let c = date+"";
              cell.onclick =()=>{this.cellCliked(c)}
              if (date === this.today.getDate() && year === this.today.getFullYear() && month === this.today.getMonth()) {
                cell.classList.add("bg-info");
            } // color today's date
              cell.classList.add("tableCell")
              cell.id = "C-"+c
              cell.appendChild(cellText);
              
              row.appendChild(cell);
              date++;
            }


        }

        tbl!.appendChild(row); // appending each row into calendar body.
    }

}



cellCliked(date?:any){
  console.log(""+date +" "+ this.currentMonth +" "+this.currentYear)
}








}

