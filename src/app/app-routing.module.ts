import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchTasksComponent } from './components/search-tasks/search-tasks.component';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';

const routes: Routes = [
  {
    path: '',
    component: TaskBoardComponent,
    pathMatch: 'full',
  },
  {
    path: 'tasks/create',
    component: TaskDetailsComponent,
    pathMatch: 'full',
  },
  {
    path: 'tasks/edit/:id',
    component: TaskDetailsComponent,
  },
  {
    path: 'tasks/search',
    component: SearchTasksComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
