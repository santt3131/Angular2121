import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { AUTH_PAGES } from '../../features/auth/auth.routes';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const service = inject(TokenStorageService);

  return (
    service.isLogin() ?? router.navigate([AUTH_PAGES.AUTH, AUTH_PAGES.LOGIN])
  );
};
