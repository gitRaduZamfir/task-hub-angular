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
import { generateId } from '../../core/utils/utils';

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
    MatNativeDateModule, 
    CategoriesComponent, 
    MatTimepickerModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  taskForm: FormGroup;
  categories: string[] = [];
  task!: Task;
  taskId: string | null = null;
  newId: string = '';

  constructor(private fb: FormBuilder, 
    private taskService: TaskService, 
    private router: Router, 
    private route: ActivatedRoute){

    this.newId = generateId();
      
    this.taskForm = this.fb.group({
      id: [this.newId],
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
          id: this.task.id,
          title: this.task.title,
          date: this.task.date ? new Date(this.task.date) : '',
          time: this.task.time ? new Date(this.task.time) : '',
          category: this.task.category,
          done: this.task.done
        });
      });
    }
  }

  submitForm(){ 
    if(this.taskForm.invalid){
      this.taskForm.markAllAsTouched();
      return;
    }
    const newTask = this.taskForm.value;

    if(this.taskId){
      this.taskService.editTask(newTask).subscribe({
        next: () => {
          this.router.navigate(['/tasks']);
        },
        error: (err) => console.error(err)
      })
    }else{
      this.taskService.createTask(newTask).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    }
  }
}

