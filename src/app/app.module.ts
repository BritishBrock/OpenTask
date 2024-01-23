import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskViewerComponent } from './task-viewer/task-viewer.component';
import { TaskComponent } from './components/task/task.component';
import { ActionComponentComponent } from './components/action-component/action-component.component';
import { TasklistComponent } from './components/tasklist/tasklist.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskViewerComponent,
    TaskComponent,
    ActionComponentComponent,
    TasklistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
