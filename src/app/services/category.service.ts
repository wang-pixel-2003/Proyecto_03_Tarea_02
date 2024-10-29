import { Injectable, inject, signal } from '@angular/core';
import { BaseService } from './base-service';
import { ICategory, IResponse } from '../interfaces'; 
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends BaseService<ICategory> {
  protected override source: string = 'categories';
  private itemListSignal = signal<ICategory[]>([]);
  private snackBar = inject(MatSnackBar);

  get items$() {
    return this.itemListSignal;
  }

  public getAll() {
    this.findAll().subscribe({
      next: (response: any) => {
        response.reverse();
        this.itemListSignal.set(response);
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
        this.snackBar.open('Error fetching categories', 'Close', { duration: 3000 });
      },
    });
  }

  public save(item: ICategory) {
    this.add(item).subscribe({
      next: (response: IResponse<ICategory>) => {
        this.itemListSignal.update((categories) => [response.data, ...categories]);
        this.snackBar.open('Category added successfully', 'Close', { duration: 3000 });
      },
      error: (error: any) => {
        console.error('Error adding category:', error);
        this.snackBar.open('Error adding category', 'Close', { duration: 3000 });
      },
    });
  }

  public update(item: ICategory) {
    this.edit(item.id, item).subscribe({
      next: (response: IResponse<ICategory>) => {
        this.itemListSignal.update((categories) => {
          const index = categories.findIndex((cat) => cat.id === response.data.id);
          if (index !== -1) {
            categories[index] = response.data;
          }
          return [...categories];
        });
        this.snackBar.open('Category updated successfully', 'Close', { duration: 3000 });
      },
      error: (error: any) => {
        console.error('Error updating category:', error);
        this.snackBar.open('Error updating category', 'Close', { duration: 3000 });
      },
    });
  }

  public delete(category: ICategory) {
    this.del(category.id).subscribe({
      next: () => {
        this.itemListSignal.update((categories) => categories.filter((cat) => cat.id !== category.id));
        this.snackBar.open('Category deleted successfully', 'Close', { duration: 3000 });
      },
      error: (error: any) => {
        console.error('Error deleting category:', error);
        this.snackBar.open('Error deleting category', 'Close', { duration: 3000 });
      },
    });
  }
}