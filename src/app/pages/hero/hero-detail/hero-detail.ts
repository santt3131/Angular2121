import { Component, computed, inject, input, numberAttribute } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { HeroItemNotFound } from '../../../components/hero-item-not-found/hero-item-not-found';
import { HeroItem } from '../../../components/hero-item/hero-item';
import { Hero } from '../../../shared/interfaces/hero.interface';
import { HeroService } from '../../../shared/services/hero';

@Component({
  selector: 'app-hero-detail',
  imports: [HeroItem, HeroItemNotFound],
  template: `
    @if (hero()) {
      <app-hero-item [hero]="hero()" />
    } @else {
      <app-hero-item-not-found />
    }
  `,
})
export class HeroDetail {
  //Es un señal el input
  id = input(0, { transform: numberAttribute });
  readonly #heroService = inject(HeroService);
  readonly #heroResource = rxResource<Hero, { id: number }>({
    params: () => ({ id: this.id() }), //cada vez que esta señal cambie
    stream: ({ params }) => this.#heroService.findOne(params.id),
    // realizo un subscribe a este observable
  });
  //Realizo un computed para obtener el valor de la señal del #heroResource
  //y si no existe el héroe, retornar un héroe nulo
  hero = computed(() => this.#heroResource.value() ?? this.#heroService.NullHero);

  constructor() {}
}
