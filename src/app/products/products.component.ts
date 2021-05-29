import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'app/models/product';
import { ShoppingCart } from 'app/models/shopping-cart';
import { ProductService } from 'app/product.service';
import { ShoppingCartService } from 'app/shopping-cart.service';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products;
  filteredProducts: Product[] = [];
  cart$: Observable<ShoppingCart>;
  category: string;

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this,this.populateProducts();
  }

  private populateProducts() {
    this.productService
      .getAll()
      .switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      })
      .subscribe(params => {
          this.category = params.get('category');
          this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredProducts = this.category ?
        this.products.filter(p => p.category === this.category) :
        this.products;
  }
}
