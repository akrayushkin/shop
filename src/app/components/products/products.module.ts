import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';

import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsComponent } from './products.component';

@NgModule({
  imports: [SharedModule],
  declarations: [ProductsComponent, ProductComponent, ProductListComponent],
  exports: [ProductsComponent]
})
export class ProductsModule {}
