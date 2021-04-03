import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { selectCartTotalQuantity, selectIsNotEmptyCart } from './../../core/@ngrx';
import { Store } from '@ngrx/store';

import { AuthService } from '../../shared/services';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {
  cartTotalQuantity$: Observable<number>;
  isNotEmptyCart$: Observable<boolean>;

  constructor(
    public authService: AuthService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.cartTotalQuantity$ = this.store.select(selectCartTotalQuantity);
    this.isNotEmptyCart$ = this.store.select(selectIsNotEmptyCart);
  }
}
