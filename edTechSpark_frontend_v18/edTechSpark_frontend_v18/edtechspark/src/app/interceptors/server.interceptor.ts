import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { User } from '../models/user';
import { catchError, throwError } from 'rxjs';

//ng g interceptor <interceptorName>
export const serverInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(req.url, req.body);
  let user: User | undefined;
  let authService = inject(AuthService);
  user = authService.user
  if (user != undefined) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.token}`,
      }
    })
  }
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.error('Unauthorized request');
      } else if (error.status === 500) {
        console.error('Server error');
      }
      return throwError(() => error);
    }));
};
