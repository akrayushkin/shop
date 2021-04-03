import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductsActions from './products.actions';
import * as RouterActions from '../router/router.actions';

// rxjs
import { Observable } from 'rxjs';
import { concatMap, map, pluck, switchMap } from 'rxjs/operators';

import { ProductsService } from '../../../shared/services/products.service';
import { ProductModel } from '../../../models';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {
    console.log('[PRODUCTS EFFECTS]');
  }

  getProducts$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.getProducts),
      switchMap(action =>
        // Notice!
        // If you have a connection to the Firebase,
        // the stream will be infinite - you have to unsibscribe
        // This can be performed following this pattern
        // this.productObservableService
        //      .getProducts()
        //      .pipe(takeUntil(this.actions$.pipe(ofType(ProductsActions.ProductListComponentIsDestroyed))
        // If you use HttpClient, the stream is finite,
        // so you have no needs to unsibscribe
        this.productsService
          .getProducts()
          .then(products => ProductsActions.getProductsSuccess({ products }))
          .catch(error => ProductsActions.getProductsError({ error }))
      )
    )
  );

  getProductsAdmin$: Observable<Action> = createEffect(() =>
  this.actions$.pipe(
    ofType(ProductsActions.getProductsAdmin),
    switchMap(action =>
      // Notice!
      // If you have a connection to the Firebase,
      // the stream will be infinite - you have to unsibscribe
      // This can be performed following this pattern
      // this.productObservableService
      //      .getProducts()
      //      .pipe(takeUntil(this.actions$.pipe(ofType(ProductsActions.ProductListComponentIsDestroyed))
      // If you use HttpClient, the stream is finite,
      // so you have no needs to unsibscribe
      this.productsService
        .getProducts()
        .then(products => ProductsActions.getProductsAdminSuccess({ products }))
        .catch(error => ProductsActions.getProductsAdminError({ error }))
      )
    )
  );

  updateProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.updateProduct),
      pluck('product'),
      concatMap((product: ProductModel) =>
        this.productsService
          .updateProduct(product)
          .then((updatedProduct: ProductModel) => {
            return ProductsActions.updateProductSuccess({ product: updatedProduct });
          })
          .catch(error => ProductsActions.updateProductError({ error }))
      )
    )
  );

  createProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.createProduct),
      pluck('product'),
      concatMap((product: ProductModel) =>
        this.productsService
          .createProduct(product)
          .then((createdProduct: ProductModel) => {
            return ProductsActions.createProductSuccess({ product: createdProduct });
          })
          .catch(error => ProductsActions.createProductError({ error }))
      )
    )
  );

  createUpdateProductSuccess$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.createProductSuccess, ProductsActions.updateProductSuccess),
      map(action =>
        RouterActions.go({
          path: ['/admin/products']
        })
      )
    );
  });

  deleteProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.deleteProduct),
      pluck('product'),
      concatMap((product: ProductModel) =>
        this.productsService
          .deleteProduct(product)
          .then(
            (/* method delete for this API returns nothing, so we will use previous product */) => {
              return ProductsActions.deleteProductSuccess({ product });
            }
          )
          .catch(error => ProductsActions.deleteProductError({ error }))
      )
    )
  );
}
