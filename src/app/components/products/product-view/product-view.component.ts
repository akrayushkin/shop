import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { ProductModel } from 'src/app/models';
import { CartService, ProductsService } from '../../../shared/services';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  product: ProductModel;

  constructor(
    private router: Router,
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
        switchMap((params: ParamMap) => this.productsService.getProductById(+params.get('productID')))
      )
      .subscribe(observer);
  }

  onBuy(): void {
    this.cartService.addProduct(this.product.id);
  }
}
