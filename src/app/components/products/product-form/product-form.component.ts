import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../../interfaces';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductsFormComponent {
  @Input() title: string = '';
  @Input() toUpdateProduct: IProduct = {};
  @Output() callParentEvent: EventEmitter<IProduct> = new EventEmitter<IProduct>();

  addEdit() {
    this.callParentEvent.emit(this.toUpdateProduct);
  }
}