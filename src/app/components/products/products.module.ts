import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsComponent } from './products.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ProductsComponent, ProductComponent, ProductListComponent],
  exports: [ProductsComponent],
  // Для каких целей используете entryComponents?
  entryComponents: [ProductsComponent]
})
export class ProductsModule {}
