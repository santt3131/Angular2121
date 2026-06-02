import { Component, computed, DestroyRef, inject, input, signal } from '@angular/core';
import { HeroItem } from '../hero-item/hero-item';
import { Hero } from '../../shared/interfaces/hero.interface';
import { HeroPowerstatsChange } from '../../shared/interfaces/hero-powerstats-change';
import { HeroService } from '../../shared/services/hero';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NEVER } from 'rxjs';

@Component({
  selector: 'app-hero-list',
  imports: [HeroItem],
  template: `
    <div class="flex flex-wrap gap-4">
      @for (hero of heroes(); track hero.id) {
        <app-hero-item
          [hero]="hero"
          (powerstatsChange)="savePowerstats($event)"
          (removeHero)="removeHero($event)"
        />
      } @empty {
        <h1>There are no Heroes</h1>
      }
    </div>
  `,
})
export class HeroList {
  heroes = input.required<Hero[]>();
  readonly #heroService = inject(HeroService);
  //readonly #destroyRef = inject(DestroyRef);

  #heroToRemoveSignal = signal<Hero>(this.#heroService.defaultHero);
  #heroToUpdateSignal = signal<HeroPowerstatsChange>({
    hero: this.#heroService.defaultHero,
    powerstat: 'intelligence',
    value: 0,
  });

  #heroToRemoveResource = rxResource({
    params: () => this.#heroToRemoveSignal(), //params aqui es el hero
    stream: ({ params }) =>
      this.#heroService.isDefaultHero(params) ? NEVER : this.#heroService.remove(params),
  });

  #heroToUpdateResource = rxResource({
    params: () => this.#heroToUpdateSignal(),
    stream: ({ params }) =>
      this.#heroService.isDefaultHero(params.hero)
        ? NEVER
        : this.#heroService.updatePowerstat(params.hero, params.powerstat, params.value),
  });

  isHeroToRemoveResourceCompleted = computed(
    () =>
      !this.#heroService.isDefaultHero(this.#heroToRemoveSignal()) &&
      this.#heroToRemoveResource.status() === 'resolved',
  );

  isHeroToUpdateResourceCompleted = computed(
    () =>
      this.#heroToUpdateSignal().value !== 0 && this.#heroToUpdateResource.status() === 'resolved',
  );

  savePowerstats({ hero, powerstat, value }: HeroPowerstatsChange) {
    this.#heroToUpdateSignal.set({ hero, powerstat, value });
  }

  removeHero(hero: Hero) {
    this.#heroToRemoveSignal.set(hero);
  }
}
