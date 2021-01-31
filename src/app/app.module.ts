import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ProductsModule } from './components/products/products.module';
import { CartModule } from './components/cart/cart.module';

import { AppComponent } from './app.component';
import { FirstComponent } from './components/first/first.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    FirstComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductsModule,
    CartModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
