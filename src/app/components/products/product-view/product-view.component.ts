import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';

import { ProductModel } from 'src/app/models';
import { CartService, ProductsService } from '../../../shared/services';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  product: ProductModel;

  constructor(
    public productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const observer = {
      next: (product: ProductModel) => (this.product = { ...product }),
      error: (err: any) => console.log(err)
    };
    this.activatedRoute.paramMap
      .pipe(
        switchMap((params: ParamMap) => this.productsService.getProductById(+params.get('productID'))),
        takeUntil(this.destroy$)
      )
      .subscribe(observer);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onBuy(): void {
    const observer = {
      error: (err: any) => console.log(err)
    };
    const cartProduct = this.cartService.getCartProductById(this.product.id);
    if (cartProduct) {
      const increaseQuantityProduct = this.cartService.getIncreaseQuantityProduct(cartProduct);
      this.cartService.updateProducts(increaseQuantityProduct)
        .pipe(takeUntil(this.destroy$))
        .subscribe(observer);
    } else {
      this.cartService.addProduct(this.product)
        .pipe(takeUntil(this.destroy$))
        .subscribe(observer);
    }
  }
}
