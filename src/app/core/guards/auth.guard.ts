import { Injectable } from '@angular/core';
import {
  CanActivate, CanActivateChild, CanLoad, Router, Route,
  ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras, UrlTree, UrlSegment
} from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService, UserRoles } from './../../shared/services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad  {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('CanActivate Guard is called');
    const { url } = state;
    return this.checkLogin(url);
  }

  canLoad(route: Route, segments: UrlSegment[] ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('CanLoad Guard is called');
    const url = `/${route.path}`;
    return this.checkLogin(url);
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('CanActivateChild Guard is called');
    const { url } = state;
    return this.checkLogin(url);
  }

  private checkLogin(url: string): boolean | UrlTree {
    if (this.authService.isLoggedIn && this.authService.userRole === UserRoles.admin) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page, return UrlTree
    return this.router.parseUrl('/login');
  }
}
