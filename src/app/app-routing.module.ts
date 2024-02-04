import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskViewerComponent } from './board-viewer/task-viewer/task-viewer.component';

const routes: Routes = [
  {path:"taskviewer",component:TaskViewerComponent},
  {path:"",component:TaskViewerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
