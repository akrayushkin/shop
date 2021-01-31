import { Injectable } from '@angular/core';
import { productsMock } from '../../mocks/products.mock';
import { ProductModel } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor() { }
  getProducts(): ProductModel[] {
    return productsMock;
  }

  getProductById(id: number): ProductModel {
    return productsMock.find(item => item.id === id);
  }
}
