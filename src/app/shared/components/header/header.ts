import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HEROES_PAGES } from '../../../features/heroes/heroes.routes';
import { AUTH_PAGES } from '../../../features/auth/auth.routes';

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
}
