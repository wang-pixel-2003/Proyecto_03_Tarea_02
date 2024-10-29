import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IProduct } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';
import { ProductService } from '../../../services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsFormComponent } from '../product-form/product-form.component'; // Asegúrate de la ruta correcta

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, ModalComponent, ProductsFormComponent], // Asegúrate de agregarlo aquí
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductsListComponent {
  @Input() itemList: IProduct[] = [];
  @Output() callDeleteEvent: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() callUpdateEvent: EventEmitter<IProduct> = new EventEmitter<IProduct>();

  public selectedItem: IProduct = {};
  private productService = inject(ProductService);
  public modalService = inject(NgbModal);

  deleteProduct(item: IProduct) {
    this.productService.delete(item);
  }

  openEditModal(item: IProduct) {
    this.productService.update(item);
  }

  showDetailModal(item: IProduct, modal: any) {
    this.selectedItem = item;
    modal.show();
  }

  onFormEventCalled(params: IProduct) {
    this.productService.update(params);
    this.modalService.dismissAll();
  }
}