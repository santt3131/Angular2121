import { Component, inject } from '@angular/core';
import { HeroList } from '../../components/hero-list/hero-list';
import { HeroService } from '../../shared/services/hero';

@Component({
  selector: 'app-home',
  imports: [HeroList],
  template: `<app-hero-list [heroes]="heroes" />`,
})
export class Home {
  readonly #heroes = inject(HeroService);
  heroes = this.#heroes.findAll();
}
