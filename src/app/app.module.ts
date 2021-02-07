import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CartModule } from './components/cart/cart.module';
import { FirstComponent } from './components/first/first.component';
import { ProductsModule } from './components/products/products.module';
import { SharedModule } from './shared/shared.module';

registerLocaleData(localeRu, 'ru');

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
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'RUB' },
    { provide: LOCALE_ID, useValue: 'ru' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
