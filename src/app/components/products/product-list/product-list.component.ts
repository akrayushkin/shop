import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

// @Ngrx
import { Store } from '@ngrx/store';
import { selectCartProductByID, selectProductsData, selectProductsError } from './../../../core/@ngrx';
import * as ProductsActions from '../../../core/@ngrx/products/products.actions';
import * as CartActions from '../../../core/@ngrx/cart/cart.actions';
import * as RouterActions from '../../../core/@ngrx/router/router.actions';

import { CartService } from '../../../shared/services';
import { ProductModel } from '../../../models';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  products$: Observable<ReadonlyArray<ProductModel>>;
  productsError$: Observable<Error | string>;


  constructor(
    private cartService: CartService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(ProductsActions.getProducts());
    this.products$ = this.store.select(selectProductsData);
    this.productsError$ = this.store.select(selectProductsError);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onBuy(product: ProductModel): void {
    this.store.select(selectCartProductByID, {id: product.id})
      .pipe(
        take(1),
        takeUntil(this.destroy$)
      )
      .subscribe(cartProduct => {
        if (cartProduct) {
          const сhangedProduct = this.cartService.getIncreaseQuantityProduct(cartProduct);
          this.store.dispatch(CartActions.updateCartProduct({product: сhangedProduct}));
        } else {
          this.store.dispatch(CartActions.addCartProduct({product: product}));
        }
    })
  }

  onViewProduct(product: ProductModel): void {
    const link = ['/product', product.id];
    this.store.dispatch(RouterActions.go({
      path: link
    }));
  }
}
