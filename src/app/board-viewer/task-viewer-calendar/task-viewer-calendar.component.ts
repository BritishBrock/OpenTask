import { Component } from '@angular/core';

@Component({
  selector: 'app-task-viewer-calendar',
  templateUrl: './task-viewer-calendar.component.html',
  styleUrl: './task-viewer-calendar.component.scss'
})
export class TaskViewerCalendarComponent {

  currentYear:any;
  selectYear:any;
  selectMonth:any;
  monthAndYear:any;
  months:any;
  currentMonth:any;

  ngOnInit(){
    
    
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
    console.log(tbl)
    console.log("f")
    // clearing all previous cells
    tbl!.innerHTML = "";

    // filing data about month and in the page via DOM.

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
              let cell = document.createElement("td");
              let cellText = document.createTextNode(date +"");
              if (date === this.today.getDate() && year === this.today.getFullYear() && month === this.today.getMonth()) {
                  cell.classList.add("bg-info");
              } // color today's date
              cell.appendChild(cellText);
              row.appendChild(cell);
              date++;
            }


        }

        tbl!.appendChild(row); // appending each row into calendar body.
    }

}
today:any;
ngAfterViewInit(){
   this.today = new Date();
   this.currentMonth = this.today.getMonth();
   this.currentYear = this.today.getFullYear();

   this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  

  this.showCalendar(this.currentMonth, this.currentYear);
}
 
}

