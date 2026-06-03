import { Routes } from '@angular/router';
import { heroResolver } from './guards/hero.resolver';
import { heroIdMatcher } from './matchers/hero-id.matcher';

export enum HEROES_PAGES {
  HERO = '/hero',
  HOME = 'home',
  NEW = 'new',
  UPDATE = 'update',
}

export const HEROES_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        // path y pathMatch: Redirige a Home solo si la URL interna está 100% vacía.
        path: '',
        pathMatch: 'full', //Exigimos coincidencia exacta
        redirectTo: HEROES_PAGES.HOME,
      },
      {
        path: HEROES_PAGES.HOME,
        loadComponent: () => import('./pages/home/home').then((c) => c.Home),
      },
      {
        path: HEROES_PAGES.NEW,
        loadComponent: () => import('./pages/hero-new/hero-new').then((c) => c.HeroNew),
      },
      {
        path: `${HEROES_PAGES.UPDATE}/:id`,
        loadComponent: () => import('./pages/hero-update/hero-update').then((c) => c.HeroUpdate),
        resolve: { hero: heroResolver },
        // resolve: Precarga los datos del héroe en segundo plano antes de mostrar la pantalla de edición.
      },
      {
        loadComponent: () => import('./pages/hero-detail/hero-detail').then((c) => c.HeroDetail),
        matcher: heroIdMatcher,
        // matcher: Aplica una regla personalizada (expresión regular)
        // para validar si la URL es un ID correcto
      },
    ],
  },
  {
    // path: '**': Comodín de rescate al final que redirige a Home
    // si el usuario escribe una ruta inexistente.
    path: '**',
    redirectTo: HEROES_PAGES.HOME,
  },
];
