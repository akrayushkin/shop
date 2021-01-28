import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { ProductModel } from 'src/app/models/product.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[app-cart-item]',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemComponent {
  @Input() product: ProductModel;
  @Input() index: number;
  @Output() remove = new EventEmitter<number>();
  @Output() increase = new EventEmitter<number>();
  @Output() decrease = new EventEmitter<number>();
}
