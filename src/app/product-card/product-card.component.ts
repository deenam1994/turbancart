import { Component, Input } from '@angular/core';
import { Product } from 'app/models/product';
import { ShoppingCart } from 'app/models/shopping-cart';
import { ShoppingCartService } from 'app/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent{

  @Input('product')
  product: Product;

  @Input('showActions')
  showActions: true;

  @Input('shoppingCart')
  shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
