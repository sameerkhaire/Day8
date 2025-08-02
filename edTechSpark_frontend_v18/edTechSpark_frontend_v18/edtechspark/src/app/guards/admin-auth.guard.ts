import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);
  if (authService.user == undefined) {
    router.navigate(['login']);
    return true;
  }
  //authorization
  else if (authService.user.roles?.indexOf('Admin') != -1) {
    return true;
  }
  else {
    router.navigate(['unauthorize']);
    return true;
  }
};
