import { Component } from '@angular/core';

import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent {
  constructor(public cartService: CartService) { }

  onRemove(id: number): void {
    this.cartService.removeProduct(id);
  }

  onIncreaseQuantity(id: number): void {
    this.cartService.increaseQuantity(id);
  }

  onDecreaseQuantity(id: number): void {
    this.cartService.decreaseQuantity(id);
  }

  onClear(): void {
    this.cartService.removeAllProducts();
  }
}
