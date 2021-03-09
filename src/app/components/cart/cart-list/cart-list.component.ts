import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { CartService } from '../../../shared/services/cart.service';
import { ProductModel, Sort } from 'src/app/models';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  sort: Sort = {
    key: 'name',
    isAsc: true
  };

  private destroy$ = new Subject<void>();

  constructor(public cartService: CartService) { }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onRemove(product: ProductModel): void {
    const observer = {
      error: (err: any) => console.log(err)
    };
    this.cartService.removeProduct(product)
      .pipe(takeUntil(this.destroy$))
      .subscribe(observer);
  }

  onIncreaseQuantity(id: number): void {
    const observer = {
      error: (err: any) => console.log(err)
    };
    const cartProduct = this.cartService.getCartProductById(id);
    const increaseQuantityProduct = this.cartService.getIncreaseQuantityProduct(cartProduct);
    this.cartService.updateProducts(increaseQuantityProduct)
      .pipe(takeUntil(this.destroy$))
      .subscribe(observer);
  }

  onDecreaseQuantity(id: number): void {
    const observer = {
      error: (err: any) => console.log(err)
    };
    const cartProduct = this.cartService.getCartProductById(id);
    const increaseQuantityProduct = this.cartService.getDecreaseQuantityProduct(cartProduct);
    if (increaseQuantityProduct.quantity) {
      this.cartService.updateProducts(increaseQuantityProduct)
        .pipe(takeUntil(this.destroy$))
        .subscribe(observer);
    } else {
      this.onRemove(increaseQuantityProduct);
    }
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
