import { Component, DestroyRef, inject, input } from '@angular/core';
import { HeroItem } from '../hero-item/hero-item';
import { Hero } from '../../shared/interfaces/hero.interface';
import { HeroPowerstatsChange } from '../../shared/interfaces/hero-powerstats-change';
import { HeroService } from '../../shared/services/hero';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  readonly #destroyRef = inject(DestroyRef);

  savePowerstats({ hero, powerstat, value }: HeroPowerstatsChange) {
    this.#heroService
      .updatePowerstat(hero, powerstat, value)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: () => console.log('Powerstat updated'),
        error: (error) => console.error('Error updating powerstat:', error),
        complete: () => console.log('Powerstat update completed'),
      });
  }

  removeHero(hero: Hero) {
    this.#heroService
      .remove(hero)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: () => console.log('Hero removed'),
        error: (error) => console.error('Error removing hero:', error),
        complete: () => console.log('Hero removal completed'),
      });
  }
}
