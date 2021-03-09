import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CartService, ProductsService } from '../../../shared/services';
import { ProductModel } from 'src/app/models';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  products: Promise<ProductModel[]>;

  constructor(
    private router: Router,
    public productsService: ProductsService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onBuy(product: ProductModel): void {
    const observer = {
      error: (err: any) => console.log(err)
    };
    const cartProduct = this.cartService.getCartProductById(product.id);
    if (cartProduct) {
      const increaseQuantityProduct = this.cartService.getIncreaseQuantityProduct(cartProduct);
      this.cartService.updateProducts(increaseQuantityProduct)
        .pipe(takeUntil(this.destroy$))
        .subscribe(observer);
    } else {
      this.cartService.addProduct(product)
        .pipe(takeUntil(this.destroy$))
        .subscribe(observer);
    }
  }

  onViewProduct(product: ProductModel): void {
    const link = ['/product', product.id];
    this.router.navigate(link);
  }
}
