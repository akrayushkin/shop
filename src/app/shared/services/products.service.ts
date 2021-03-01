import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { productsMock } from '../../mocks/products.mock';
import { ProductModel } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  getProducts(): Observable<ProductModel[]> {
    return new Observable(observe => {
      setTimeout(() => {
        observe.next(productsMock);
      }, 300);
    });
  }

  getProductById(id: number): Observable<ProductModel> {
    return of(productsMock.find(item => item.id === id));
  }

  createProduct(product: ProductModel): void {
    productsMock.push(product);
  }

  updateProduct(product: ProductModel): void {
    const i = productsMock.findIndex(t => t.id === product.id);

    if (i > -1) {
      productsMock.splice(i, 1, product);
    }
  }
}
