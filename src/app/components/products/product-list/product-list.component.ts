import { Component } from '@angular/core';

import { CartService, ProductsService } from '../../../shared/services';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  constructor(
    public productsService: ProductsService,
    private cartService: CartService
  ) { }

  onBuy(id: number): void {
    this.cartService.addProductToCart(id);
  }
}
