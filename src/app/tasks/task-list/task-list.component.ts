import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../core/models/task.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';



@Component({
  standalone: true,
  selector: 'app-task-list',
  imports: [CommonModule, MatCardModule, MatIconModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {

  tasks: Task[] = [];
  
  constructor(private taskService: TaskService){}

  ngOnInit(): void{
    this.taskService.getTasks().subscribe((data)=>{
      this.tasks = data;
    })
  }
}
