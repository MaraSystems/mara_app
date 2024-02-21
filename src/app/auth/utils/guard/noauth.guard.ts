import { CanActivateFn, Router } from '@angular/router';
import { AuthAccessService } from '../access/auth-access.service';
import { inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

export const NoAuthGuard: CanActivateFn = (route, state) => {
  const authAccessService: AuthAccessService = inject(AuthAccessService);
  const router: Router = inject(Router);
  const flag = authAccessService.getAuth().pipe(
    map(() => false),
    catchError(() => of(true))
  );

  if (!flag) {
    router.navigateByUrl('/profile');
  }

  return flag;
};
