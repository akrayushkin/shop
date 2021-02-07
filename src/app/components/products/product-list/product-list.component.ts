import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CartService, ProductsService } from '../../../shared/services';
import { ProductModel } from 'src/app/models';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$: Observable<ProductModel[]>;

  constructor(
    public productsService: ProductsService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.products$ = this.productsService.getProducts();
  }

  onBuy(id: number): void {
    this.cartService.addProduct(id);
  }
}
