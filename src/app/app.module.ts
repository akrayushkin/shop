import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { ProductsService } from './services/products.service';

import { AppComponent } from './app.component';
import { FirstComponent } from './components/first/first.component';
import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list/product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    ProductComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
