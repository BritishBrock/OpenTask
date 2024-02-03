import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskViewerComponent } from './task-viewer/task-viewer.component';
import { TaskComponent } from './components/task/task.component';
import { TasklistComponent } from './components/tasklist/tasklist.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { TaskModalComponent } from './components/task-modal/task-modal.component';
import { TaskStylingComponent } from './components/task-modal/task-styling/task-styling.component';
import { TaskDetailsComponent } from './components/task-modal/task-details/task-details.component';
import { FormsModule } from '@angular/forms';
import { TaskColorsComponent } from './components/task-modal/task-colors/task-colors.component';

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
