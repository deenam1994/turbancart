import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth.service';
import { Order } from 'app/models/order';
import { ShoppingCart } from 'app/models/shopping-cart';
import { OrderService } from 'app/order.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  @Input('cart') cart: ShoppingCart;
  shipping = {
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: ''
  };
  subscriptionUser: Subscription;
  userId: string;

  constructor(private orderService: OrderService,
    private authService: AuthService,
    private router: Router) { }

  async ngOnInit() {
    this.subscriptionUser = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.subscriptionUser.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }
}
