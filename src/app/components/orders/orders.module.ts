import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { ProcessOrderComponent } from './process-order/process-order.component';
import { OrdersRoutingModule } from './orders-routing.module';

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule
  ],
  declarations: [OrdersComponent, ProcessOrderComponent]
})
export class OrdersModule { }
