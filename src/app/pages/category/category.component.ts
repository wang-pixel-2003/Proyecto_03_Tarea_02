import { Component, OnInit, inject } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CategoriesListComponent } from '../../components/category/category-list/category-list.component';
import { CategoryService } from '../../services/category.service';
import { ModalComponent } from '../../components/modal/modal.component';
import { CategoriesFormComponent } from '../../components/category/category-form/category-form.component';
import { ICategory } from '../../interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    LoaderComponent,
    CategoriesListComponent,
    ModalComponent,
    CategoriesFormComponent,
  ],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoriesComponent implements OnInit {
  public categoryService: CategoryService = inject(CategoryService);
  public modalService: NgbModal = inject(NgbModal);
  public route: ActivatedRoute = inject(ActivatedRoute);
  public authService: AuthService = inject(AuthService);
  public routeAuthorities: string[] = [];
  public areActionsAvailable: boolean = false;

  ngOnInit(): void {
    this.authService.getUserAuthorities();
    this.categoryService.getAll();
    this.route.data.subscribe((data) => {
      this.routeAuthorities = data['authorities'] ? data['authorities'] : [];
      this.areActionsAvailable = this.authService.areActionsAvailable(this.routeAuthorities);
    });
  }

  onFormEventCalled(params: ICategory) {
    this.categoryService.save(params);
    this.modalService.dismissAll();
  }
}