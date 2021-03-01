import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export enum UserRoles {
  user = 'user',
  admin = 'admin'
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  userRole: UserRoles = null;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(userRole: UserRoles): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(val => {
        this.isLoggedIn = val;
        this.userRole = userRole;
      })
    );
  }

  logout(): void {
    this.isLoggedIn = false;
    this.userRole = null;
  }
}
