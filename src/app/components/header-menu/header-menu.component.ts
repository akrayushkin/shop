import { Component, Input } from '@angular/core';

import { CartService, AuthService } from '../../shared/services';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent {
  constructor(
    public cartService: CartService,
    public authService: AuthService
  ) { }
}
