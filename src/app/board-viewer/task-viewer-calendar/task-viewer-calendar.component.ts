import { Component } from '@angular/core';
import { Task } from '../../Models/Task/Task';
import { TaskViewerBoardService } from '../../Services/taskViewerBoard/task-viewer-board.service';
import { TaskModalService } from '../../Services/task-modal.service';

@Component({
  selector: 'app-task-viewer-calendar',
  templateUrl: './task-viewer-calendar.component.html',
  styleUrl: './task-viewer-calendar.component.scss',
})
export class TaskViewerCalendarComponent {
  constructor(
    private TaskViewerBoardService: TaskViewerBoardService,
    private modalService: TaskModalService
  ) { }

  currentYear: any;
  selectYear: any;
  selectMonth: any;
  monthAndYear: any;
  months: any;
  currentMonth: any;
  today: any;

  taskEndDates: any = {};
  taskStartDates: any = {};
  allDates: any = [];

  switchMonth(month: any) {
    this.currentMonth += month;
    if(this.currentMonth < 0 ){
      this.currentYear--;
      this.currentMonth  = 11;
    }
    if(this.currentMonth> 11 ){
      this.currentMonth = 0;
      this.currentYear++;
    }
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
    });

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

    this.today = new Date();
    this.currentMonth = this.today.getMonth();

    this.currentYear = this.today.getFullYear();

    this.months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    this.showCalendar(this.currentMonth, this.currentYear);

    this.addTasksToCalender();
  }

  createTaskInCalender(task: Task, CreateTitle: boolean) {
    let taskDiv = document.createElement('div');
    taskDiv.style.width = '100%';
    taskDiv.style.height = '20px';
    taskDiv.style.background = task.colorTag;
    if (CreateTitle) taskDiv.textContent = task.name;
    taskDiv.onclick = () => {
      this.modalService.taskModal.next(task);
    };
    return taskDiv;
  }

  addTasksToCalender() {
    let auxFirst: any[] = [];
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
      if (this.allDates[i][0] === 'NaN-NaN-NaN') {
        if (
          this.currentMonth == new Date(this.allDates[i][1]).getMonth() &&
          this.currentYear == new Date(this.allDates[i][1]).getFullYear()
        ) {
          document
            .getElementById('C-' + new Date(this.allDates[i][1]).getDate())!
            .append(this.createTaskInCalender(this.allDates[i][2], true));
        }
      } else if (this.allDates[i][1] === 'NaN-NaN-NaN') {
        if (
          this.currentMonth == new Date(this.allDates[i][0]).getMonth() &&
          this.currentYear == new Date(this.allDates[i][0]).getFullYear()
        ) {
          document
            .getElementById('C-' + new Date(this.allDates[i][0]).getDate())!
            .append(this.createTaskInCalender(this.allDates[i][2], true));
        }
      } else {
        if (
          this.currentMonth == new Date(this.allDates[i][0]).getMonth() &&
          this.currentYear == new Date(this.allDates[i][0]).getFullYear() &&
          this.currentMonth == new Date(this.allDates[i][1]).getMonth() &&
          this.currentYear == new Date(this.allDates[i][1]).getFullYear()
        ) {
          for (
            let j = 0;
            j <=
            new Date(this.allDates[i][0]).getDate() -
            new Date(this.allDates[i][1]).getDate();
            j++
          ) {
            if (
              j !=
              new Date(this.allDates[i][0]).getDate() -
              new Date(this.allDates[i][1]).getDate()
            ) {
              document
                .getElementById(
                  'C-' + (new Date(this.allDates[i][1]).getDate() + j)
                )!
                .append(this.createTaskInCalender(this.allDates[i][2], false));
            } else {
              document
                .getElementById(
                  'C-' + (new Date(this.allDates[i][1]).getDate() + j)
                )!
                .append(this.createTaskInCalender(this.allDates[i][2], true));
            }
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
          cell.classList.add('tableCell');
          cell.appendChild(cellText);
          row.appendChild(cell);
        } else if (date > daysInMonth) {
          let cell = document.createElement('div');
          let cellText = document.createTextNode('');
          cell.classList.add('tableCell');
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
          cell.classList.add('tableCell');
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
