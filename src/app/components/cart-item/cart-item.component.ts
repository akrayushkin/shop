import { Component, Input } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[app-cart-item]',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {
  @Input() product: ProductModel;
  @Input() index: number;

  constructor(public cartService: CartService) { }
}
