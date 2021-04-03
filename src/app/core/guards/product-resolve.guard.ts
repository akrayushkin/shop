import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';

// rxjs
import { Observable, of } from 'rxjs';
import { map, catchError, take, tap, delay } from 'rxjs/operators';
import { selectSelectedProductByUrl } from '../@ngrx';
import * as ProductsActions from '../@ngrx/products/products.actions'
import * as RouterActions from '../../core/@ngrx/router/router.actions';

import { ProductModel } from '../../models';


@Injectable({
  providedIn: 'any'
})
export class ProductResolveGuard implements Resolve<ProductModel> {
  constructor(
    private store: Store
  ) {}

  resolve(): Observable<ProductModel | null> {
    console.log('ProductResolve Guard is called');

    return this.store.select(selectSelectedProductByUrl).pipe(
      tap(product => this.store.dispatch(ProductsActions.setOriginalProduct({ product }))),
      delay(500),
      map((product: ProductModel) => {
        if (product) {
          return product;
        } else {
          this.store.dispatch(RouterActions.go({
            path: ['/admin/products']
          }));
          return null;
        }
      }),
      take(1),
      catchError(() => {
        this.store.dispatch(RouterActions.go({
          path: ['/admin/products']
        }));
        // catchError MUST return observable
        return of(null);
      }),
    );
  }
}
