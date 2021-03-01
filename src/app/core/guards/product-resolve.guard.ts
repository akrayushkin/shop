import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

// rxjs
import { Observable, of } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';

import { ProductModel } from '../../models';
import { ProductsService } from '../../shared/services';

import { productEmptyMock } from '../../mocks/products.mock';

@Injectable({
  providedIn: 'any'
})
export class ProductResolveGuard implements Resolve<ProductModel> {
  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ProductModel | null> {
    console.log('ProductResolve Guard is called');

    if (!route.paramMap.has('productID')) {
      return of(productEmptyMock);
    }

    const id = +route.paramMap.get('productID');

    return this.productsService.getProductById(id).pipe(
      map((product: ProductModel) => {
        if (product) {
          return product;
        } else {
          this.router.navigate(['/admin/products']);
          return null;
        }
      }),
      take(1),
      catchError(() => {
        this.router.navigate(['/admin/products']);
        // catchError MUST return observable
        return of(null);
      })
    );
  }
}
