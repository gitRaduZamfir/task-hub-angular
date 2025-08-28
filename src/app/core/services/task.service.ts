import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';
import { Observable, map } from 'rxjs';
import { Categories } from '../models/category.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private auth: AuthService) { 
  }

  private get currentUser() {
    return this.auth.getUser();
  }

  getUserTasks(): Observable<Task[]> {
    if (!this.currentUser) return new Observable<Task[]>(subscriber => subscriber.next([]));
    return this.http.get<Task[]>(`${this.apiUrl}/tasks?user=${this.currentUser?.username}`);
  }

  getTask(id: string): Observable<Task> {
    const url = `${this.apiUrl}/tasks?user=${this.currentUser?.username}&id=${id}`;
    return this.http.get<Task[]>(url).pipe(map(tasks=>tasks[0]))
  }


  createTask(task: Task){
    const url = `${this.apiUrl}/tasks`;
    return this.http.post<Task>(url, task);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<{ id: string; categories: string[] }>(`${this.apiUrl}/config/categories/`)
      .pipe(
        map((response) => {
          console.log(response);
          return response.categories}
        )
      );
  }

  addNewCategory(categories: Categories){
    return this.http.put(`${this.apiUrl}/config/categories/`, categories);
  }

  editTask(task: Task){
    const url = `${this.apiUrl}/tasks/${task.id}`;
    return this.http.put(url, task);
  }

  deleteTask(task: Task){
    const url = `${this.apiUrl}/tasks/${task.id}`;
    return this.http.delete(url);
  }
}
