import { Routes } from '@angular/router';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'tasks', component: TaskListComponent},
  { path: 'add', component: TaskFormComponent},
  { path: 'edit/:id', component: TaskFormComponent},
];
