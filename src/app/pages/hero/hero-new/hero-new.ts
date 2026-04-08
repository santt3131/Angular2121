import { Component, inject } from '@angular/core';
import { HeroForm } from '../../../components/hero-form/hero-form';
import { Hero } from '../../../shared/interfaces/hero.interface';
import { HeroService } from '../../../shared/services/hero';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-new',
  imports: [HeroForm],
  template: `
    <div class="flex flex-col items-center bg-[cadetblue]">
      <h3 class="text-2xl font-bold text-white">Add an Hero!</h3>
      <app-hero-form (sendHero)="addHero($event)" />
    </div>
  `,
})
export class HeroNew {
  readonly #heroService = inject(HeroService);
  readonly #router = inject(Router);

  addHero(_hero: Hero) {
    const hero: Hero = {
      ..._hero,
      id: Math.floor(Math.random() * 1000) + 1,
    };
    console.log('New hero added:', hero);
    this.#heroService.add(hero);
    this.#router.navigate(['/home']);
  }
}
