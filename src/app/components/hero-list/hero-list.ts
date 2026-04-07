import { Component, inject, input } from '@angular/core';
import { HeroItem } from '../hero-item/hero-item';
import { Hero } from '../../shared/interfaces/hero.interface';
import { HeroPowerstatsChange } from '../../shared/interfaces/hero-powerstats-change';
import { HeroService } from '../../shared/services/hero';

@Component({
  selector: 'app-hero-list',
  imports: [HeroItem],
  templateUrl: './hero-list.html',
})
export class HeroList {
  heroes = input.required<Hero[]>();
  readonly #heroService = inject(HeroService);

  savePowerstats({ hero, powerstat, value }: HeroPowerstatsChange) {
    this.#heroService.update(hero, powerstat, value);
  }
}
