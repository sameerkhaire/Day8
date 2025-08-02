import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const userAuthGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);
  
  if (authService.user == undefined) {
    router.navigate(['login']);
    return true;
  }
  //authorization
  else if (authService.user.roles?.indexOf('User') != -1) {
    return true;
  }
  else {
    router.navigate(['unauthorize']);
    return true;
  }
};
