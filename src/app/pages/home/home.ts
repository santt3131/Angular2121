import { Component, DestroyRef, inject } from '@angular/core';
import { HeroList } from '../../components/hero-list/hero-list';
import { HeroService } from '../../shared/services/hero';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  imports: [HeroList],
  template: ` @if (heroes()) {
    <app-hero-list [heroes]="heroes()" />
  }`,
})
export class Home {
  readonly #heroes = inject(HeroService);
  readonly #destroyRef = inject(DestroyRef);
  //Nos estamos conectado al estado de la aplicación
  heroes = this.#heroes.heroes;

  constructor() {
    this.#heroes.load().pipe(takeUntilDestroyed(this.#destroyRef)).subscribe();
  }
}
