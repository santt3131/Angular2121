import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HEROES_PAGES } from '../../../features/heroes/heroes.routes';
import { AUTH_PAGES } from '../../../features/auth/auth.routes';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, RouterLinkActive],
  templateUrl: './header.html',
  styles: ``,
})
export class Header {
  navigation = {
    home: [HEROES_PAGES.HERO, HEROES_PAGES.HOME],
    heroNew: [HEROES_PAGES.HERO, HEROES_PAGES.NEW],
    login: [AUTH_PAGES.AUTH, AUTH_PAGES.LOGIN],
    register: [AUTH_PAGES.AUTH, AUTH_PAGES.REGISTER],
  };

  readonly #tokenStoageService = inject(TokenStorageService);
  readonly #router = inject(Router);
  isLogin = this.#tokenStoageService.isLogin;

  logout() {
    const isSure = window.confirm('Are you sure?');
    if (isSure) {
      this.#tokenStoageService.logout();
      this.#router.navigate([AUTH_PAGES.AUTH, AUTH_PAGES.LOGIN]);
    }
  }
}
