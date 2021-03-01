import { Component } from '@angular/core';

import { CartService } from '../../../shared/services/cart.service';

import { Sort } from '../../../models/sort.model';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent {
  sort: Sort = {
    key: 'name',
    isAsc: true
  };

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

  onToggleSort(key: string): void {
    if (this.sort.key === key) {
      return;
    }
    this.sort.key = key;
  }
}
