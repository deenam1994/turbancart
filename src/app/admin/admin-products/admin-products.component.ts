import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { Product } from 'app/models/product';
import { ProductService } from 'app/product.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {

  products: Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(
      products => {
      this.products = products

      this.initializeTableResource(products);
      });
  }

  initializeTableResource(products: Product[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0})
    .then(items => this.items = items);
    this.tableResource.count()
    .then(count => this.itemCount = count);
  }

  reloadItems(params) {
    if(!params || !this.tableResource) return;

    this.tableResource.query(params)
    .then(items => this.items = items);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query) {
    let filteredProducts = (query) ?
    this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())):
    this.products;

    this.initializeTableResource(filteredProducts);
  }
}
