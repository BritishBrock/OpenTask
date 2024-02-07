import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskViewerComponent } from './board-viewer/task-viewer/task-viewer.component';
import { BoardViewerComponent } from './board-viewer/board-viewer.component';
import { BoardPickerComponent } from './board-picker/board-picker.component';

const routes: Routes = [
  {path:"",component:BoardPickerComponent},
  {path:":id",component:BoardViewerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
