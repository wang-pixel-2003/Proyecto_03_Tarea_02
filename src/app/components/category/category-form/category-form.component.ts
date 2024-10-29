import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICategory } from '../../../interfaces';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoriesFormComponent {
  @Input() title: string = '';
  @Input() toUpdateCategory: ICategory = {};
  @Output() callParentEvent: EventEmitter<ICategory> = new EventEmitter<ICategory>();

  addEdit() {
    this.callParentEvent.emit(this.toUpdateCategory);
  }
}