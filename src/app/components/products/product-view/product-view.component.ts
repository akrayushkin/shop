import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { ProductModel } from 'src/app/models';
import { CartService, ProductsService } from '../../../shared/services';
import * as CartActions from '../../../core/@ngrx/cart/cart.actions';

// @NgRx
import { Store } from '@ngrx/store';
import { selectSelectedProductByUrl, selectCartProductByID } from './../../../core/@ngrx';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit, OnDestroy {
  destroy$: Subject<void>  = new Subject<void>();
  product: ProductModel;

  constructor(
    public productsService: ProductsService,
    private store: Store,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const observer: any = {
      next: (product: ProductModel) => {
        this.product = {...product};
      },
      error(err) {
        console.log(err);
      },
      complete() {
        console.log('Stream is completed');
      }
    };

    this.store.select(selectSelectedProductByUrl)
          .pipe(takeUntil(this.destroy$))
          .subscribe(observer);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onBuy(): void {
    this.store.select(selectCartProductByID, {id: this.product.id})
      .pipe(
        take(1),
        takeUntil(this.destroy$)
      )
      .subscribe(cartProduct => {
        if (cartProduct) {
          const сhangedProduct = this.cartService.getIncreaseQuantityProduct(cartProduct);
          this.store.dispatch(CartActions.updateCartProduct({product: сhangedProduct}));
        } else {
          this.store.dispatch(CartActions.addCartProduct({product: this.product}));
        }
    })
  }
}
