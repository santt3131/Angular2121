import { Component, computed, inject, input, numberAttribute } from '@angular/core';
import { HeroItem } from '../../../components/hero-item/hero-item';
import { HeroService } from '../../../shared/services/hero';
import { Hero } from '../../../shared/interfaces/hero.interface';
import { HeroItemNotFound } from '../../../components/hero-item-not-found/hero-item-not-found';

@Component({
  selector: 'app-hero-detail',
  imports: [HeroItem, HeroItemNotFound],
  template: `
    @if (this.isValidHero()) {
      <app-hero-item [hero]="hero()" />
    } @else {
      <app-hero-item-not-found />
    }
  `,
})
export class HeroDetail {
  id = input(0, { transform: numberAttribute });
  readonly #heroService = inject(HeroService);
  hero = computed<Hero>(() => this.#heroService.findOne(this.id()));
  isValidHero = computed(() => !this.#heroService.isNullHero(this.hero()));
}
