import { Injectable } from '@angular/core';

// @NgRx
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CartActions from './cart.actions';

// Rxjs
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, concatMap, pluck } from 'rxjs/operators';

import { CartService } from '../../../shared/services';
import { ProductModel } from '../../../models';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private cartService: CartService,
  ) {
    console.log('[CART EFFECTS]');
  }

  getCartProducts$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.getCartProducts),
      switchMap(() =>
        this.cartService.fetchAllProducts().pipe(
          map(products => CartActions.getCartProductsSuccess({ products })),
          catchError(error => of(CartActions.getCartProductsError({ error })))
        )
      )
    )
  );

  updateCartProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.updateCartProduct),
      pluck('product'),
      concatMap((product: ProductModel) =>
        this.cartService.updateProduct(product).pipe(
          map(updatedProduct => {;
            return CartActions.updateCartProductSuccess({ product: updatedProduct });
          }),
          catchError(error => of(CartActions.updateCartProductError({ error })))
        )
      )
    )
  );

  addCartProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addCartProduct),
      pluck('product'),
      concatMap((product: ProductModel) =>
        this.cartService.addProduct(product).pipe(
          map(addedProduct => {
            return CartActions.addCartProductSuccess({ product: addedProduct });
          }),
          catchError(error => of(CartActions.addCartProductError({ error })))
        )
      )
    )
  );

  removeCartProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.deleteCartProduct),
      pluck('product'),
      concatMap((product: ProductModel) =>
        this.cartService.removeProduct(product).pipe(
          // Note: json-server doesn't return deleted product
          // so we use product
          map(() => CartActions.deleteCartProductSuccess({ product })),
          catchError(error => of(CartActions.deleteCartProductError({ error })))
        )
      )
    )
  );
}
