import { Injectable, inject, signal } from '@angular/core';
import { BaseService } from './base-service';
import { IProduct, IResponse } from '../interfaces'; 
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService<IProduct> {
  protected override source: string = 'products';
  private itemListSignal = signal<IProduct[]>([]);
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
        console.error('Error fetching products:', error);
        this.snackBar.open('Error fetching products', 'Close', { duration: 3000 });
      },
    });
  }

  public save(item: IProduct) {
    this.add(item).subscribe({
      next: (response: IResponse<IProduct>) => {
        this.itemListSignal.update((products) => [response.data, ...products]);
        this.snackBar.open('Product added successfully', 'Close', { duration: 3000 });
      },
      error: (error: any) => {
        console.error('Error adding product:', error);
        this.snackBar.open('Error adding product', 'Close', { duration: 3000 });
      },
    });
  }

  public update(item: IProduct) {
    this.edit(item.id, item).subscribe({
      next: (response: IResponse<IProduct>) => {
        this.itemListSignal.update((products) => {
          const index = products.findIndex((prod) => prod.id === response.data.id);
          if (index !== -1) {
            products[index] = response.data;
          }
          return [...products];
        });
        this.snackBar.open('Product updated successfully', 'Close', { duration: 3000 });
      },
      error: (error: any) => {
        console.error('Error updating product:', error);
        this.snackBar.open('Error updating product', 'Close', { duration: 3000 });
      },
    });
  }

  public delete(product: IProduct) {
    this.del(product.id).subscribe({
      next: () => {
        this.itemListSignal.update((products) => products.filter((prod) => prod.id !== product.id));
        this.snackBar.open('Product deleted successfully', 'Close', { duration: 3000 });
      },
      error: (error: any) => {
        console.error('Error deleting product:', error);
        this.snackBar.open('Error deleting product', 'Close', { duration: 3000 });
      },
    });
  }
}