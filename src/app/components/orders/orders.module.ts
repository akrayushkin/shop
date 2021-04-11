import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { ProcessOrderComponent } from './process-order/process-order.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidatorsModule } from 'src/app/validators/validators.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OrdersRoutingModule,
    MaterialModule,
    ValidatorsModule
  ],
  declarations: [OrdersComponent, ProcessOrderComponent]
})
export class OrdersModule { }
