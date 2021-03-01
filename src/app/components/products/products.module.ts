import { NgModule } from '@angular/core';

import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { ProductComponent, ProductListComponent, ProductViewComponent } from '.';
import { ProductsComponent } from './products.component';

@NgModule({
  imports: [SharedModule, ProductsRoutingModule],
  declarations: [ProductsComponent, ProductComponent, ProductListComponent, ProductViewComponent]
})
export class ProductsModule {}
