import { Injectable } from '@angular/core';

import { ProductModel } from '../../models/product.model';

import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  shoppingList: ProductModel[] = [];

  constructor(private productsService: ProductsService) {}

  get totalPrice(): number {
    return this.shoppingList.reduce(
      (sum, current) => sum + current.price,
      0
    );
  }

  get totalQuantity(): number {
    return this.shoppingList.reduce(
      (sum, current) => sum + current.quantity,
      0
    );
  }

  addProductToCart(id: number): void {
    if (!this.isProductInCart(id)) {
      const product: ProductModel = {
        ...this.productsService.getProductById(id),
        quantity: 1
      };
      this.shoppingList = [...this.shoppingList, product];
    } else {
      this.increaseQuantity(id);
    }
  }

  increaseQuantity(id: number): void {
    this.shoppingList = this.shoppingList.map((item) => {
      return item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
            price: this.productsService.getProductById(id).price * (item.quantity + 1),
          }
        : {
          ...item,
        };
    });
  }

  decreaseQuantity(id: number): void  {
    const target = this.shoppingList.find((item) => item.id === id);
    if (target.quantity === 1) {
      this.removeProductFromCart(id);
    } else {
      this.shoppingList = this.shoppingList.map((item) => {
        return item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
              price: this.productsService.getProductById(id).price * (item.quantity - 1),
            }
          : {
            ...item,
          };
      });
    }
  }

  removeProductFromCart(id: number): void {
    this.shoppingList = this.shoppingList.filter((item) => item.id !== id);
  }

  clearCart(): void {
    this.shoppingList = [];
  }

  private isProductInCart(id: number): boolean {
    return this.shoppingList.some((item) => item.id === id);
  }
}
