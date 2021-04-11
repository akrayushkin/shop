import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  UrlTree,
} from '@angular/router';
// rxjs
import { Observable } from 'rxjs';
// ngrx
import { Store } from '@ngrx/store';
import { selectIsNotEmptyCart } from './../../core/@ngrx';


@Injectable({
  providedIn: 'root',
})
export class OrdersGuard implements CanActivate, CanLoad {
  constructor(private store: Store) {}

  canActivate():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    console.log('CanActivate Guard is called');
    return this.store.select(selectIsNotEmptyCart);
  }

  canLoad():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('CanLoad Guard is called');
    return this.store.select(selectIsNotEmptyCart);
  }
}
