import { NgModule } from '@angular/core';

import { CartRoutingModule } from './cart-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { CartComponent } from './cart.component';
import { CartItemComponent, CartListComponent } from '.';

@NgModule({
  imports: [SharedModule, CartRoutingModule],
  declarations: [CartComponent, CartListComponent, CartItemComponent]
})

export class CartModule {}
