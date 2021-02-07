import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
      }, 1000);
    });
  }

  getProductById(id: number): ProductModel {
    return productsMock.find(item => item.id === id);
  }
}
