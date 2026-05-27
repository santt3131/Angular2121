import { Component, inject } from '@angular/core';
import { HeroList } from '../../components/hero-list/hero-list';
import { HeroService } from '../../shared/services/hero';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [HeroList, AsyncPipe],
  template: ` @let heroes = (heroes$ | async)?.heroes;
    @if (heroes) {
      <app-hero-list [heroes]="heroes" />
    }`,
})
export class Home {
  readonly #heroes = inject(HeroService);
  heroes$ = this.#heroes.load();
}
