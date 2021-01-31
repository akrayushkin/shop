import { Injectable } from '@angular/core';

import { ProductModel } from '../../models';

import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  totalSum = 0;
  totalQuantity = 0;
  // tslint:disable-next-line: variable-name
  private _cartProducts: ProductModel[] = [];

  constructor(private productsService: ProductsService) {}

  get isEmptyCart(): boolean {
    return !this.cartProducts.length;
  }

  get cartProducts(): ProductModel[] {
    return this._cartProducts;
  }

  addProduct(id: number): void {
    if (!this.isProductInCart(id)) {
      const product: ProductModel = {
        ...this.productsService.getProductById(id),
        quantity: 1
      };
      this._cartProducts = [...this.cartProducts, product];
    } else {
      this.increaseQuantity(id);
    }
    this.updateCartData();
  }

  increaseQuantity(id: number): void {
    this.changeQuantity(id, 1);
  }

  decreaseQuantity(id: number): void  {
    const target = this.cartProducts.find((item) => item.id === id);
    if (target.quantity === 1) {
      this.removeProduct(id);
    } else {
      this.changeQuantity(id, -1);
    }
  }

  removeProduct(id: number): void {
    this._cartProducts = this.cartProducts.filter((item) => item.id !== id);
    this.updateCartData();
  }

  removeAllProducts(): void {
    this._cartProducts = [];
    this.updateCartData();
  }

  private isProductInCart(id: number): boolean {
    return this.cartProducts.some((item) => item.id === id);
  }

  private changeQuantity(id: number, diffQuantity: number): void {
    this._cartProducts = this.cartProducts.map((item) => {
      return item.id === id
        ? {
            ...item,
            quantity: item.quantity + diffQuantity,
            price: this.productsService.getProductById(id).price * (item.quantity + diffQuantity),
          }
        : {
          ...item,
        };
    });
    this.updateCartData();
  }

  private updateCartData(): void {
    this.totalSum = this.cartProducts.reduce(
      (sum, current) => sum + current.price,
      0
    );
    this.totalQuantity = this.cartProducts.reduce(
      (sum, current) => sum + current.quantity,
      0
    );
  }
}
