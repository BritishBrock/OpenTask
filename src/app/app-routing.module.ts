import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskViewerComponent } from './board-viewer/task-viewer/task-viewer.component';
import { BoardViewerComponent } from './board-viewer/board-viewer.component';
import { BoardPickerComponent } from './board-picker/board-picker.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {path:"",component:BoardPickerComponent},
  {path:"b/:id",component:BoardViewerComponent},
  {path:"settings",component:SettingsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
