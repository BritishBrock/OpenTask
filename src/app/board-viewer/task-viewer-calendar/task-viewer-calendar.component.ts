import { Component } from '@angular/core';
import { Task } from '../../Models/Task/Task';
import { TaskViewerBoardService } from '../../Services/taskViewerBoard/task-viewer-board.service';
import { TaskModalService } from '../../Services/task-modal.service';
import { BoardService } from '../../Services/board/board.service';
import { Board } from '../../Models/Board/Board';

@Component({
  selector: 'app-task-viewer-calendar',
  templateUrl: './task-viewer-calendar.component.html',
  styleUrl: './task-viewer-calendar.component.scss',
})
export class TaskViewerCalendarComponent {
  constructor(
    private TaskViewerBoardService: TaskViewerBoardService,
    private modalService: TaskModalService,
    private boardService:BoardService,
  ) { }

  currentYear: any;
  selectYear: any;
  selectMonth: any;
  monthAndYear: any;
  months: any;
  currentMonth: any;
  today: any;
  allBoards:Board[] = this.boardService.globalBoards;
  taskEndDates: any = {};
  taskStartDates: any = {};
  allDates: any = [];

  switchMonth(month: any) {
    this.currentMonth += month;
    if (this.currentMonth < 0) {
      this.currentYear--;
      this.currentMonth = 11;
    }
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    if(this.allDates.length == 0){
    this.allDates = [];
    for (let i = 0; i < this.TaskViewerBoardService.globalTasks.length; i++) {
      if (
        this.TaskViewerBoardService.globalTasks[i].endDate ||
        this.TaskViewerBoardService.globalTasks[i].startDate
      )
        this.addToDateMap(this.TaskViewerBoardService.globalTasks[i]);
    }
    for (
      let i = 0;
      i < this.TaskViewerBoardService.globalTaskLists.length;
      i++
    ) {
      for (
        let y = 0;
        y < this.TaskViewerBoardService.globalTaskLists[i].tasks.length;
        y++
      ) {
        if (
          this.TaskViewerBoardService.globalTaskLists[i].tasks[y].endDate ||
          this.TaskViewerBoardService.globalTaskLists[i].tasks[y].startDate
        )
          this.addToDateMap(
            this.TaskViewerBoardService.globalTaskLists[i].tasks[y]
          );
      }
    }
  }
    this.showCalendar(this.currentMonth, this.currentYear);

    this.addTasksToCalender();
  }

  addToDateMap(task: Task) {
    let key =
      new Date(task.endDate!).getFullYear() +
      '-' +
      (new Date(task.endDate! + '').getMonth() + 1) +
      '-' +
      new Date(task.endDate!).getDate();
    let keyStart =
      new Date(task.startDate!).getFullYear() +
      '-' +
      (new Date(task.startDate! + '').getMonth() + 1) +
      '-' +
      new Date(task.startDate!).getDate();

    this.allDates.push([key, keyStart, task]);
  }

  ngOnInit() {
    this.modalService.TaskModalClosedEvent.subscribe(() => {
      this.updateCalendar();
    });
    this.boardService.boardUpdates.subscribe(() => {
      this.updateCalendar();
    })
    this.today = new Date();
    this.currentMonth = this.today.getMonth();

    this.currentYear = this.today.getFullYear();
 
    this.months = [$localize`Jan`, $localize`Feb`, $localize`Mar`, $localize`Abr`,$localize`May`,$localize`Jun`, $localize`Jul`, $localize`Aug`, $localize`Sep`,$localize`Oct`,$localize`Nov`,$localize`Dic`];


    this.updateCalendar();

  }
  taksThisMonth:Task[] = []
  createTaskInCalender(task: Task, CreateTitle: boolean, startTile: boolean) {
    
    let taskDiv = document.createElement('div');
    taskDiv.style.width = '100%';
    taskDiv.style.height = '20px';
    taskDiv.style.background = task.colorTag;

    if (CreateTitle) {
      taskDiv.style.borderRadius = '0 5px 5px 0';
      taskDiv.textContent = task.name;
    }if(startTile){
      taskDiv.style.borderRadius = '5px 0 0 5px';
    }

    taskDiv.onclick = () => {
      this.modalService.taskModal.next(task);
    };
    return taskDiv;
  }
  boardPicked?:number = this.boardService.activeBoard?.id;
  switchBoard(boardIndex:any){
    if(!this.boardPicked)return;
    this.boardService.setActiveBoard(this.boardPicked);
    this.updateCalendar();



  }

updateCalendar(){
  
  this.allDates = [];

  for (let i = 0; i < this.TaskViewerBoardService.globalTasks.length; i++) {
    if (
      this.TaskViewerBoardService.globalTasks[i].endDate ||
      this.TaskViewerBoardService.globalTasks[i].startDate
    )
      this.addToDateMap(this.TaskViewerBoardService.globalTasks[i]);
  }
  for (
    let i = 0;
    i < this.TaskViewerBoardService.globalTaskLists.length;
    i++
  ) {
    for (
      let y = 0;
      y < this.TaskViewerBoardService.globalTaskLists[i].tasks.length;
      y++
    ) {
      if (
        this.TaskViewerBoardService.globalTaskLists[i].tasks[y].endDate ||
        this.TaskViewerBoardService.globalTaskLists[i].tasks[y].startDate
      )
        this.addToDateMap(
          this.TaskViewerBoardService.globalTaskLists[i].tasks[y]
        );
    }
  }

  this.showCalendar(this.currentMonth, this.currentYear);
 
  this.addTasksToCalender();
}
   
  addTasksToCalender() {
    let auxFirst: any[] = [];
    this.taksThisMonth = [];
    for (let i = 0; i < this.allDates.length; i++) {
      if (
        this.allDates[i][0] !== 'NaN-NaN-NaN' &&
        this.allDates[i][1] !== 'NaN-NaN-NaN'
      ) {
        if (auxFirst.length == 0) auxFirst.push(this.allDates[i]);
        else {
          if (new Date(this.allDates[i][1]) > new Date(auxFirst[0][1]))
            auxFirst.push(this.allDates[i]);
          if (new Date(this.allDates[i][1]) < new Date(auxFirst[0][1]))
            auxFirst.unshift(this.allDates[i]);
        }
        this.allDates.splice(i, 1);
        i--;
      }
    }

    this.allDates = [...auxFirst, ...this.allDates];

    for (let i = 0; i < this.allDates.length; i++) {
      var getDaysArray = function(start:any, end:any) {
        for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
            arr.push(new Date(dt));
        }
        return arr;
      };

      let arr = getDaysArray(new Date(this.allDates[i][1]),new Date(this.allDates[i][0]));
      for(let x = 0; x < arr.length;x++){
        if(this.currentMonth == new Date(arr[x]).getMonth() &&
            this.currentYear == new Date(arr[x]).getFullYear()
        ){
          if(x == arr.length-1){
            document.getElementById('C-' + (new Date(arr[x]).getDate())
                    )!.append(this.createTaskInCalender(this.allDates[i][2], true, false));
          }else if(x == 0 ){
            document.getElementById('C-' + (new Date(arr[x]).getDate())
                    )!.append(this.createTaskInCalender(this.allDates[i][2], false, true));
          }
          else{
            document.getElementById('C-' + (new Date(arr[x]).getDate())
            )!.append(this.createTaskInCalender(this.allDates[i][2], false, false));
          }
        }
      }
    }
  }

  next() {
    this.currentYear =
      this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear;
    this.currentMonth = (this.currentMonth + 1) % 12;
    this.showCalendar(this.currentMonth, this.currentYear);
  }

  previous() {
    this.currentYear =
      this.currentMonth === 0 ? this.currentYear - 1 : this.currentYear;
    this.currentMonth = this.currentMonth === 0 ? 11 : this.currentMonth - 1;
    this.showCalendar(this.currentMonth, this.currentYear);
  }

  jump(year: any, month: any) {
    this.currentYear = parseInt(year);
    this.currentMonth = parseInt(month);
    this.showCalendar(this.currentMonth, this.currentYear);
  }

  showCalendar(month: any, year: any) {
    let firstDay = new Date(year, month).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById('calendar-body'); // body of the calendar
    // clearing all previous cells
    tbl!.innerHTML = '';

    // filing data about month and in the page via DOM.

    // creating all cells
    let date = 1;
    for (let i = 0; i < 5; i++) {
      // creates a table row
      let row = document.createElement('div');
      row.classList.add('calRow');

      //creating individual cells, filing them up with data.
      for (let j = 1; j < 8; j++) {
        if (i === 0 && j < firstDay) {
          let cell = document.createElement('div');
          let cellText = document.createTextNode('');
          if (i == 0) cell.classList.add('tableCell1');
          else cell.classList.add('tableCell');
          cell.appendChild(cellText);
          row.appendChild(cell);
        } else if (date > daysInMonth) {
          let cell = document.createElement('div');
          let cellText = document.createTextNode('');
          if (i == 0) cell.classList.add('tableCell1');
          else cell.classList.add('tableCell');

          cell.appendChild(cellText);
          row.appendChild(cell);
        } else {
          let cell = document.createElement('div');
          let cellText = document.createTextNode(date + '');
          let c = date + '';
          cell.onclick = () => { };
          if (
            date === this.today.getDate() &&
            year === this.today.getFullYear() &&
            month === this.today.getMonth()
          ) {
            cell.classList.add('bg-info');
          } // color today's date

          if (i == 0) cell.classList.add('tableCell1');
          else cell.classList.add('tableCell');
          cell.id = 'C-' + c;
          cell.appendChild(cellText);

          row.appendChild(cell);
          date++;
        }
      }

      tbl!.appendChild(row); // appending each row into calendar body.
    }
  }
}
