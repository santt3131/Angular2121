import {
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  numberAttribute,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  hero = signal<Hero>(this.#heroService.NullHero);

  constructor(private destroyRef: DestroyRef) {
    //Cada vez que cambie el id, se ejecutará el efecto
    effect(() => {
      this.#heroService
        .findOne(this.id())
        .pipe(takeUntilDestroyed(destroyRef))
        .subscribe({
          next: (_hero) => this.hero.set(_hero),
          error: () => this.hero.set(this.#heroService.NullHero),
        });
    });
  }
}
