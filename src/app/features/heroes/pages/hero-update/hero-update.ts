import { Component, computed, effect, inject, input, numberAttribute, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { NEVER } from 'rxjs';

import { Hero } from '../../interfaces/hero.interface';
import { HeroItemNotFound } from '../../components/hero-item-not-found/hero-item-not-found';
import { HeroForm } from '../../components/hero-form/hero-form';
import { HeroService } from '../../services/hero';
import { HEROES_PAGES } from '../../heroes.routes';

@Component({
  selector: 'app-hero-update',
  imports: [HeroForm, HeroItemNotFound],
  template: `
    @if (this.isValidHero()) {
      <div class="flex flex-col items-center bg-[rgb(94,104,255)] p-4 rounded-lg mb-4">
        <h3 class="text-2xl font-bold text-white">Update Hero</h3>
        <app-hero-form [hero]="hero()" (sendHero)="updateHero($event)" />
      </div>
    } @else {
      <app-hero-item-not-found />
    }
  `,
})
export class HeroUpdate {
  readonly #heroService = inject(HeroService);
  readonly #router = inject(Router);
  readonly id = input(0, { transform: numberAttribute });
  readonly #heroResource = rxResource({
    params: () => ({ id: this.id() }),
    stream: () => this.#heroService.findOne(this.id()),
  });

  readonly hero = computed(() => this.#heroResource.value() ?? this.#heroService.defaultHero);
  readonly isValidHero = computed(() => this.#heroService.isNullHero(this.hero()) !== null);

  readonly heroSignal = signal<Hero>(this.#heroService.defaultHero);
  readonly #heroToUpdateResource = rxResource({
    params: () => this.heroSignal(),
    stream: ({ params }) =>
      this.#heroService.isDefaultHero(params) ? NEVER : this.#heroService.update(params),
    equal: (hero1, hero2) => hero1.id === hero2.id,
  });

  isLoading = this.#heroToUpdateResource.isLoading;
  error = this.#heroToUpdateResource.error;
  isHeroToUpdateResourceCompleted = computed(
    () => this.#heroToUpdateResource.status() === 'resolved',
  );

  navigateEffect = effect(() => {
    if (
      !this.#heroService.isDefaultHero(this.heroSignal()) &&
      this.isHeroToUpdateResourceCompleted()
    ) {
      this.#router.navigate([HEROES_PAGES.HERO, HEROES_PAGES.HOME]);
    }
  });

  errorEffect = effect(() => {
    if (this.error()) {
      console.error('Error:', this.error());
    }
  });

  updateHero(hero: any) {
    console.log('Updated Hero:', hero);
    this.heroSignal.set(hero);
  }
}
