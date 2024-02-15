import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskViewerComponent } from './board-viewer/task-viewer/task-viewer.component';
import { TaskComponent } from './components/task/task.component';
import { TasklistComponent } from './components/tasklist/tasklist.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { TaskModalComponent } from './components/task-modal/task-modal.component';
import { TaskStylingComponent } from './components/task-modal/task-styling/task-styling.component';
import { TaskDetailsComponent } from './components/task-modal/task-details/task-details.component';
import { FormsModule } from '@angular/forms';
import { TaskColorsComponent } from './components/task-modal/task-colors/task-colors.component';
import { BoardViewerComponent } from './board-viewer/board-viewer.component';
import { TaskViewerListComponent } from './board-viewer/task-viewer-list/task-viewer-list.component';
import { TaskDateComponent } from './components/task-modal/task-date/task-date.component';
import { TaskViewerCalendarComponent } from './board-viewer/task-viewer-calendar/task-viewer-calendar.component';
import { BoardPickerComponent } from './board-picker/board-picker.component';
import { SimpleViewerComponent } from './board-viewer/simple-viewer/simple-viewer.component';


@NgModule({
  declarations: [
    AppComponent,
    TaskViewerComponent,
    TaskComponent,
    TasklistComponent,
    ContextMenuComponent,
    TaskModalComponent,
    TaskStylingComponent,
    TaskDetailsComponent,
    TaskColorsComponent,
    BoardViewerComponent,
    TaskViewerListComponent,
    TaskDateComponent,
    TaskViewerCalendarComponent,
    BoardPickerComponent,
    SimpleViewerComponent,


  ],
  exports:[
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
