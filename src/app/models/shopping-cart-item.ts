import { Product } from "./product";

export class ShoppingCartItem {
    $key: string;
    price: number;
    title: string;
    imageUrl: string;
    quantity: number;

    constructor(init?: Partial<ShoppingCartItem>) {
        Object.assign(this, init);
    }

    get totalPrice() {
        return this.price * this.quantity;
    }
}