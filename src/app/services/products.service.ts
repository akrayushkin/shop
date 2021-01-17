import { Injectable } from '@angular/core';
import { productsMock } from '../mocks/products.mock';
import { ProductModel } from '../models/product.model';

@Injectable()
export class ProductsService {
  constructor() { }
  getProducts(): ProductModel[] {
    return productsMock;
  }
}
