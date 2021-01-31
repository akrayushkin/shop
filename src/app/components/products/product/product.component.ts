import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { ProductModel } from '../../../models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
  @Input() product: ProductModel;
  @Output() buy = new EventEmitter<number>();
}
