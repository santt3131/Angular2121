import { Component, inject } from '@angular/core';
import { HeroList } from '../../components/hero-list/hero-list';

import { rxResource } from '@angular/core/rxjs-interop';
import { HeroService } from '../../services/hero';
@Component({
  selector: 'app-home',
  imports: [HeroList],
  template: ` @if (heroes()) {
    <app-hero-list [heroes]="heroes()" />
  }`,
})
export class Home {
  readonly #heroService = inject(HeroService);

  //Nos estamos conectado al estado de la aplicación
  readonly heroes = this.#heroService.heroes;

  heroesResource = rxResource({
    stream: () => this.#heroService.load(),
  });
}
