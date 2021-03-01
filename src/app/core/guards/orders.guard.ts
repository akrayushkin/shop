import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
// rxjs
import { Observable } from 'rxjs';
import { CartService } from 'src/app/shared/services';

@Injectable({
  providedIn: 'root',
})
export class OrdersGuard implements CanActivate, CanLoad {
  constructor(private cartService: CartService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    console.log('CanActivate Guard is called');
    return !this.cartService.isEmptyCart;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('CanLoad Guard is called');
    return !this.cartService.isEmptyCart;
  }
}
