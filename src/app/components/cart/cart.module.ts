import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';

import { CartComponent } from './cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartListComponent } from './cart-list/cart-list.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [CartComponent, CartListComponent, CartItemComponent],
  exports: [CartComponent],
  // ?
  entryComponents: [CartComponent]
})

export class CartModule {}
