import { Component, inject } from '@angular/core';
import { HeroList } from './components/hero-list/hero-list';
import { HeroNew } from './components/hero-new/hero-new';
import { HeroService } from './shared/services/hero';
import { Hero } from './shared/interfaces/hero.interface';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [HeroList, HeroNew, Header, Footer],
  templateUrl: './app.html',
})
export class App {
  readonly #heroService = inject(HeroService);
  heroes = this.#heroService.findAll();

  addHero(hero: Hero) {
    this.#heroService.add(hero);
  }
}
