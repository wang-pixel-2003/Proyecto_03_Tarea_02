import { Component, OnInit, inject } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ProductsListComponent } from '../../components/products/product-list/product-list.component';
import { ProductService } from '../../services/product.service';
import { ModalComponent } from '../../components/modal/modal.component';
import { ProductsFormComponent } from '../../components/products/product-form/product-form.component';
import { ICategory, IProduct } from '../../interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    LoaderComponent,
    ProductsListComponent,
    ModalComponent,
    ProductsFormComponent,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public productService: ProductService = inject(ProductService);
  public modalService: NgbModal = inject(NgbModal);
  public route: ActivatedRoute = inject(ActivatedRoute);
  public authService: AuthService = inject(AuthService);
  public routeAuthorities: string[] = [];
  public areActionsAvailable: boolean = false;

  public categories: ICategory[] = []; 
  categoryService: any;

ngOnInit(): void {
  this.authService.getUserAuthorities();
  this.productService.getAll();
  this.loadCategories(); // Agrega esta línea
  this.route.data.subscribe((data) => {
    this.routeAuthorities = data['authorities'] ? data['authorities'] : [];
    this.areActionsAvailable = this.authService.areActionsAvailable(this.routeAuthorities);
  });
}

loadCategories() {
  this.categoryService.getAll().subscribe({
    next: (response: any) => {
      this.categories = response;
    },
    error: (error: any) => {
      console.error('Error fetching categories:', error);
    },
  });
}

  openFormModal() {
    this.modalService.open(ProductsFormComponent);
  }

  onFormEventCalled(params: IProduct) {
    this.productService.save(params);
    this.modalService.dismissAll();
  }
}