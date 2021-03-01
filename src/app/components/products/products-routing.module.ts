import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductViewComponent } from '.';

import { ProductsComponent } from './products.component';

const routes: Routes = [
  {
    path: 'home',
    component: ProductsComponent
  },
  {
    path: 'product/:productID',
    component: ProductViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
