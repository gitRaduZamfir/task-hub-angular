import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../core/services/task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { CategoriesComponent } from "./categories/categories.component";
import { MatTimepickerModule } from '@angular/material/timepicker';
import { Task } from '../../core/models/task.model';

@Component({
  standalone: true,
  selector: 'app-task-form',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule, MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    RouterModule,
    MatDatepickerModule,
    MatNativeDateModule, CategoriesComponent, MatTimepickerModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  taskForm: FormGroup;
  categories: string[] = [];
  task!: Task;
  taskId: string | null = null;

  constructor(private fb: FormBuilder, private taskService: TaskService, private router: Router, private route: ActivatedRoute){
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      time: [''],
      category: ['General'],
      done: [false]
    })

    
  }

  ngOnInit(): void{
    this.taskId = this.route.snapshot.paramMap.get('id');
    if (this.taskId) {
      this.taskService.getTask(this.taskId).subscribe((data) => {
        this.task = data;
        this.taskForm.patchValue({
        title: this.task.title,
        date: this.task.date ? new Date(this.task.date) : '',
        time: this.task.time ? this.task.time : '',
        category: this.task.category,
        done: this.task.done
      });
      });
    } else {
      console.error('ID-ul task-ului lipse?te din rut?!');
    }
  }

  submitForm(){ 
    if(this.taskForm.invalid){
      this.taskForm.markAllAsTouched();
      return;
    }

    const rawTask = this.taskForm.value;

    let formattedDate: string | null = null;
    if (rawTask.date instanceof Date){
      formattedDate = rawTask.date.toLocaleDateString('ro-RO');
    }

    let formattedTime: string | null = null;
    if (rawTask.time instanceof Date){
      formattedTime = rawTask.time.toLocaleTimeString('en-GB');
    }else if (typeof formattedTime === "string"){
      formattedTime = rawTask.time;
    }

    const newTask = {
      ...rawTask,
      date: formattedDate,
      time: formattedTime
    };

    this.taskService.createTask(newTask).subscribe(() => {
      this.router.navigate(['/tasks']);
    });
  }
}


//TODO de reolvat problema cu Time si cu presectarea categoriei
