import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'app/models/product';
import { ProductService } from 'app/product.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products;
  filteredProducts: Product[] = [];
  
  category: string;

  constructor(private productService: ProductService,
    private route: ActivatedRoute) {
    this.productService
    .getAll()
    .switchMap(products => {
      this.products = products;
      return this.route.queryParamMap;
    })
    .subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = this.category ?
        this.products.filter(p => p.category === this.category) :
        this.products;
    });
  }
}
