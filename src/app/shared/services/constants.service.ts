import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {
  getAllData(): any {
    return { App: 'AngularShop', Ver: '0.1.0', API_URL: 'https://akrayushkin-angular-shop.netlify.app' };
  }
}

export const сonstantsInstance = new ConstantsService();
