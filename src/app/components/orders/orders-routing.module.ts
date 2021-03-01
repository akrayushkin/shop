import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersGuard } from '../../core';

import { ProcessOrderComponent } from '.';

const routes: Routes = [
  {
    path: '',
    canActivate: [OrdersGuard],
    component: ProcessOrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
