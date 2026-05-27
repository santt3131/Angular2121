import {
  Component,
  computed,
  inject,
  input,
  numberAttribute,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { HeroItem } from '../../../components/hero-item/hero-item';
import { HeroService } from '../../../shared/services/hero';
import { Hero } from '../../../shared/interfaces/hero.interface';
import { HeroItemNotFound } from '../../../components/hero-item-not-found/hero-item-not-found';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  imports: [HeroItem, HeroItemNotFound, AsyncPipe],
  template: `
    @let hero = hero$ | async;
    @if (hero) {
      <app-hero-item [hero]="hero" />
    } @else {
      <app-hero-item-not-found />
    }
  `,
})
export class HeroDetail implements OnChanges {
  id = input(0, { transform: numberAttribute });
  readonly #heroService = inject(HeroService);
  hero$: Observable<Hero> = of();

  ngOnChanges(): void {
    this.hero$ = this.#heroService.findOne(this.id());
  }

  /*   hero = computed<Hero>(() => this.#heroService.findOne(this.id()));
  isValidHero = computed(() => !this.#heroService.isNullHero(this.hero())); */
}
