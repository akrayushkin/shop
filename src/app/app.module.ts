import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeRu from '@angular/common/locales/ru';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { ProductsModule } from './components/products/products.module';
import { CartModule } from './components/cart/cart.module';
import { RootStoreModule } from './core/@ngrx/root-store.module';
import { httpInterceptorProviders } from './core/interceptors';

import { AppComponent } from './app.component';
import { FirstComponent, HeaderMenuComponent } from './components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    HeaderMenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ProductsModule,
    CartModule,
    SharedModule,
    LayoutModule,
    RootStoreModule,
    // MUST BE LAST
    AppRoutingModule
  ],
  providers: [
    httpInterceptorProviders,
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'RUB' },
    { provide: LOCALE_ID, useValue: 'ru' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    const replacer = (key: string, value: any): string =>
      typeof value === 'function' ? value.name : value;

    console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}
