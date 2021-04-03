import { Injectable, Inject } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, publish, refCount, concatMap } from 'rxjs/operators';

import { ProductModel } from '../../models';
import { CartAPI } from '../../core/configs/cart.config';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartProducts: ProductModel[] = [];

  constructor(
    private http: HttpClient,
    @Inject(CartAPI) private cartUrl: string
  ) {}

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

  updateProduct(product: ProductModel): Observable<ProductModel> {
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

  }

  private changeQuantity(product: ProductModel, diffQuantity: number): ProductModel {
    return {
      ...product,
      quantity: product.quantity + diffQuantity,
      price: product.price / product.quantity * (product.quantity + diffQuantity),
    };
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
