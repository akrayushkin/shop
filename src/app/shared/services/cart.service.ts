import { Injectable, Inject, OnDestroy } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, Subject, throwError } from 'rxjs';
import { catchError, retry, publish, refCount, concatMap, takeUntil } from 'rxjs/operators';

import { ProductModel } from '../../models';
import { LocalStorageKeys, LocalStorageService } from './local-storage.service';
import { CartAPI } from '../../core/configs/cart.config';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnDestroy {
  totalSum = 0;
  totalQuantity = 0;

  // tslint:disable-next-line: variable-name
  private cartProducts: ProductModel[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient,
    @Inject(CartAPI) private cartUrl: string
  ) {
    this.init();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get isEmptyCart(): boolean {
    return !this.cartProducts.length;
  }

  fetchAllProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.cartUrl).pipe(
      retry(3),
      publish(),
      refCount(),
      catchError(this.handleError)
    );
  }

  getCartProductById(id: number): ProductModel {
    return this.cartProducts.find((item) => item.id === id);
  }

  addProduct(product: ProductModel): Observable<ProductModel>{
    const url = this.cartUrl;
    const body = JSON.stringify({...product, quantity: 1});
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http
      .post<ProductModel>(url, body, options)
      .pipe(
        catchError(this.handleError)
      );
}

  updateProducts(product: ProductModel): Observable<ProductModel> {
    const url = `${this.cartUrl}/${product.id}`;
    const body = JSON.stringify(product);
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http
          .put<ProductModel>(url, body, options)
          .pipe(
            catchError(this.handleError),
          );
  }

  removeProduct(product: ProductModel): Observable<ProductModel[]> {
    const url = `${this.cartUrl}/${product.id}`;
    return this.http.delete(url)
            .pipe(
              concatMap(() => this.fetchAllProducts()),
              catchError(this.handleError),
            );
  }

  getIncreaseQuantityProduct(product: ProductModel): ProductModel {
    return this.changeQuantity(product, 1);
  }

  getDecreaseQuantityProduct(product: ProductModel): ProductModel  {
    return this.changeQuantity(product, -1);
  }

  removeAllProducts(): void {
    const observer = {
      error: (err: any) => console.log(err)
    };
    this.cartProducts.forEach(item => {
      this.removeProduct(item)
        .pipe(takeUntil(this.destroy$))
        .subscribe(observer);
    });
  }

  private init(): void {
    const observer = {
      next: (cartProducts) => {
        this.cartProducts = cartProducts;
        this.updateTotalValues();
      },
      error: (err: any) => console.log(err)
    };
    this.fetchAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe(observer);
    /*  this.cartProducts =
      JSON.parse(this.localStorageService.get(LocalStorageKeys.cart)) || []; */
  }

  private changeQuantity(product: ProductModel, diffQuantity: number): ProductModel {
    return {
      ...product,
      quantity: product.quantity + diffQuantity,
      price: product.price / product.quantity * (product.quantity + diffQuantity),
    };
  }

  private updateCartData(): void {
    this.updateTotalValues();
    //this.localStorageService.set(LocalStorageKeys.cart, JSON.stringify(this.cartProducts));
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

  private handleError(err: HttpErrorResponse): Observable<never> {
    // A client-side or network error occurred.
    if (err.error instanceof Error) {
      console.error('An error occurred:', err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
