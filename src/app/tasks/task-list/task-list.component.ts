import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../core/models/task.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/services/auth.service';




@Component({
  standalone: true,
  selector: 'app-task-list',
  imports: [CommonModule, MatCardModule, MatIconModule, RouterModule, MatButtonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {

  tasks: Task[] = [];
  
  constructor(private taskService: TaskService, private router: Router, private authService: AuthService){}

  ngOnInit(): void{
    this.taskService.getUserTasks().subscribe((data)=>{
      this.tasks = data;
    })
  }

  markAsDone(task: Task) :void{
    const updatedTask = task;
    updatedTask.done = true;
    this.taskService.editTask(updatedTask).subscribe({
      next: () => {
        this.taskService.getUserTasks().subscribe((data)=>{
          this.tasks = data;
        })
      },
      error: (err) => console.error(err)
    }

    )
  }

  editTask(task: Task) :void{
    this.router.navigate(['/edit', task.id]);
  }

  deleteTask(task: Task){
     this.taskService.deleteTask(task).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== task.id);
      },
      error: (err) => console.error(err)
    });
  }

  logOut(): void{
    this.authService.logout();
    this.router.navigate(['/login']);
    return;
  }
}
