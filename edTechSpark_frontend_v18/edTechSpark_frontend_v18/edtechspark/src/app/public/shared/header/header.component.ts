import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../../../models/cart';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  cart: Cart;
  user: User | any;
  constructor(private cartService: CartService, private authService: AuthService, private router: Router) {
    this.cart = this.cartService.getCart();
    this.user = this.authService.user;
  }

  
  logOut() {
    this.authService.RemoveAuthUser();
    this.user = this.authService.user;
    return this.router.navigate(['/login']);
  }
}
