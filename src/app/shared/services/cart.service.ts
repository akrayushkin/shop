import { Injectable } from '@angular/core';
import { ProductModel } from '../../models';
import { LocalStorageKeys, LocalStorageService } from './local-storage.service';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  totalSum = 0;
  totalQuantity = 0;
  // tslint:disable-next-line: variable-name
  private _cartProducts: ProductModel[] = [];

  constructor(
    private productsService: ProductsService,
    private localStorageService: LocalStorageService
  ) {
    this.init();
  }

  get isEmptyCart(): boolean {
    return !this.cartProducts.length;
  }

  get cartProducts(): ProductModel[] {
    return this._cartProducts;
  }

  addProduct(id: number): void {
    if (!this.isProductInCart(id)) {
      this.productsService.getProductById(id)
        .subscribe(product => {
          this._cartProducts = [...this.cartProducts, {...product, quantity: 1}];
        });
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

  private init(): void {
    this._cartProducts =
      JSON.parse(this.localStorageService.get(LocalStorageKeys.cart)) || [];
    this.updateTotalValues();
  }

  private isProductInCart(id: number): boolean {
    return this.cartProducts.some((item) => item.id === id);
  }

  private changeQuantity(id: number, diffQuantity: number): void {
    this.productsService.getProductById(id)
      .subscribe(product => {
        this._cartProducts = this.cartProducts.map((item) => {
          return item.id === id
            ? {
                ...item,
                quantity: item.quantity + diffQuantity,
                price: product.price * (item.quantity + diffQuantity),
              }
            : {
              ...item,
            };
        });
        this.updateCartData();
      });
  }

  private updateCartData(): void {
    this.updateTotalValues();
    this.localStorageService.set(LocalStorageKeys.cart, JSON.stringify(this.cartProducts));
  }

  private updateTotalValues(): void {
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
