import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { TaskService } from '../../../core/services/task.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Categories } from '../../../core/models/category.model';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatIconModule, MatButtonModule, MatInputModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  @Input() pickedCategory: string | null = null;
  @Output() categoryChange = new EventEmitter<string>();
  isInputVisible = false;
  showButtons = false;
  showAlertMessage = false;
  showSuccessMessage = false;
  showDeleteCategory = true;
  categories: string[] = [];
  selectedCategory: string | null = null;

  constructor(private taskService: TaskService){}

  ngOnInit(): void {
    this.taskService.getCategories().subscribe(data => {
      this.categories = data;
    });

    if(this.pickedCategory){
      this.selectedCategory = this.pickedCategory;
    }
  }
  

  showNewCategoryInput(): void{
    this.isInputVisible = true;
  }

  addCategory(value: string): void{
    const trimmedValue = value.trim();
    if (!trimmedValue) return;

    const exists = this.categories.some(
      cat => cat.toLowerCase() === trimmedValue.toLowerCase()
    );

    if (exists) {
      this.closeAddCategory();
      this.showAlertMessage = true;
       setTimeout(()=>this.showAlertMessage = false, 1500)
      return;
    }

    this.categories.push(trimmedValue);

    const dbCategories: Categories = {id: "categories", categories: this.categories};

    this.taskService.addNewCategory(dbCategories).subscribe(() => {
        this.closeAddCategory();
        this.showSuccessMessage = true;
        setTimeout(()=>this.showSuccessMessage = false, 1500)
    });
    this.onCategorySelected(trimmedValue);
  }

  deleteCategory(category: string) :void{
    this.categories = this.categories.filter(cat => cat !== category);
    const dbCategories: Categories = {
      id: "categories",
      categories: this.categories
    };

    this.taskService.addNewCategory(dbCategories)
      .subscribe(() => {
        console.log(`Category '${category}' deleted successfully`);
      });
  }

  toggleSelection(cat: string, event: MouseEvent) {
    event.stopPropagation();
    if (this.selectedCategory === cat) {
      this.selectedCategory = null;
    } else {
      this.selectedCategory = cat;
    }
  }

  toggleButtons(): void{
    this.showButtons = true;
  }

  closeAddCategory(): void{
    this.showButtons = false;
    this.isInputVisible= false;
  }

  onCategorySelected(cat: string){
    this.selectedCategory = cat;
    this.categoryChange.emit(cat);
  }

}
