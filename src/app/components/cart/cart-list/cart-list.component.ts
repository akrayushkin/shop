import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as CartActions from '../../../core/@ngrx/cart/cart.actions';
import { selectCartProducts, selectCartError, selectCartTotalSum, selectCartTotalQuantity, selectIsNotEmptyCart } from '../../../core/@ngrx';

import { CartService } from '../../../shared/services/cart.service';
import { ProductModel, Sort } from 'src/app/models';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  cartProducts$: Observable<ProductModel[]>;
  cartProductsError$: Observable<Error | string>;
  cartTotalSum$: Observable<number>;
  cartTotalQuantity$: Observable<number>;
  isNotEmptyCart$: Observable<boolean>;
  sort: Sort = {
    key: 'name',
    isAsc: true
  };

  constructor(
    public cartService: CartService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.cartProducts$ = this.store.select(selectCartProducts);
    this.cartProductsError$ = this.store.select(selectCartError);
    this.cartTotalSum$ = this.store.select(selectCartTotalSum);
    this.cartTotalQuantity$ = this.store.select(selectCartTotalQuantity);
    this.isNotEmptyCart$ = this.store.select(selectIsNotEmptyCart);
  }

  onRemove(product: ProductModel): void {
    const productToRemove: ProductModel = { ...product };
    this.store.dispatch(CartActions.deleteCartProduct({ product: productToRemove }));
  }

  onIncreaseQuantity(product: ProductModel): void {
    const сhangedProduct = this.cartService.getIncreaseQuantityProduct(product);
    this.store.dispatch(CartActions.updateCartProduct({product: сhangedProduct}));
  }

  onDecreaseQuantity(product: ProductModel): void {
    const сhangedProduct = this.cartService.getDecreaseQuantityProduct(product);
    if (сhangedProduct.quantity) {
      this.store.dispatch(CartActions.updateCartProduct({product: сhangedProduct}));
    } else {
      this.onRemove(сhangedProduct);
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
