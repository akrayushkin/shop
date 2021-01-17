import { CartService } from './../../services/cart.service';
import { Component } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent {
  constructor(public cartService: CartService) { }

  trackByItems(index: number, item: ProductModel): number { return item.id; }
}
