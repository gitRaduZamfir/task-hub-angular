import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../core/services/task.service';
import { Router } from '@angular/router';
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
    MatNativeDateModule, CategoriesComponent],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  taskForm: FormGroup;
  categories: string[] = [];

  constructor(private fb: FormBuilder, private taskService: TaskService, private router: Router){
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      deadline: ['', Validators.required],
      category: ['General'],
      done: [false]
    })
  }



  submitForm(){ 
    if(this.taskForm.invalid){
      this.taskForm.markAllAsTouched();
      return;
    }

    const newTask = this.taskForm.value;

    this.taskService.createTask(newTask).subscribe(() => {
        this.router.navigate(['/tasks']);
    })
  }


}
