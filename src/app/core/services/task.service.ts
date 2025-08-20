import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';
import { Observable, map } from 'rxjs';
import { Categories } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';
  private categoriesApiUrl = 'http://localhost:3000/config/categories/';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl)
  }

  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`)
  }


  createTask(task: Task){
    return this.http.post<Task>('http://localhost:3000/tasks', task);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<{ id: string; categories: string[] }>(this.categoriesApiUrl)
      .pipe(
        map((response) => {
          console.log(response);
          return response.categories}
        )
      );
  }

  addNewCategory(categories: Categories){
    return this.http.put('http://localhost:3000/config/' + `${categories.id}`, categories);
  }

  editTask(task: Task){
    return this.http.put('http://localhost:3000/tasks/' + `${task.id}`, task);
  }

  deleteTask(task: Task){
    return this.http.delete(`http://localhost:3000/tasks/${task.id}`);
  }
}
