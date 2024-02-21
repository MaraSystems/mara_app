import { CanActivateFn, Router } from '@angular/router';
import { AuthAccessService } from '../access/auth-access.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authAccessService: AuthAccessService = inject(AuthAccessService);
  const router: Router = inject(Router);
  const flag = authAccessService.getAuth().pipe(
    map(() => true),
    catchError(() => of(false))
  );
  
  if (!flag) {
    router.navigateByUrl('/auth');
  }

  return flag;
};
