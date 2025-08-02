import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',

})
export class HeaderComponent  {
  user: User | any;
  constructor(private authService: AuthService, private router: Router) {
    this.user = this.authService.user;
  }

  logOut() {
    this.authService.RemoveAuthUser();
    this.user = this.authService.user;
    return this.router.navigate(['/login']);
  }

}
