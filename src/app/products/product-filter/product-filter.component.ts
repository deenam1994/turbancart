import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'app/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {

  @Input('category') category: string;

  categories$;

  constructor(private categoryService: CategoryService) {
    this.categories$ = this.categoryService.getCategories();
  }
}
