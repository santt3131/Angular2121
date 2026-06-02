import { Component, computed, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { NEVER } from 'rxjs';
import { HeroForm } from '../../../components/hero-form/hero-form';
import { Hero } from '../../../shared/interfaces/hero.interface';
import { HeroService } from '../../../shared/services/hero';

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
  readonly heroSignal = signal<Hero>(this.#heroService.defaultHero);
  readonly #heroResource = rxResource({
    params: () => ({ hero: this.heroSignal() }),
    stream: ({ params }) =>
      this.#heroService.isDefaultHero(params.hero) ? NEVER : this.#heroService.add(params.hero),
    equal: (hero1, hero2) => hero1.id === hero2.id, //no invoca al stream si equal se satisfagase
  });

  isLoading = this.#heroResource.isLoading;
  error = this.#heroResource.error;
  isHeroResourceCompleted = computed(() => this.#heroResource.status() === 'resolved');

  navigateEffect = effect(() => {
    if (!this.#heroService.isDefaultHero(this.heroSignal()) && this.isHeroResourceCompleted()) {
      this.#router.navigate(['/home']);
    }
  });

  errorEffect = effect(() => {
    if (this.error()) {
      console.error('Error ', this.error());
    }
  });

  addHero(_hero: Hero) {
    const hero: Hero = {
      ..._hero,
      id: Math.floor(Math.random() * 10000) + 1, // Genera un ID aleatorio para el nuevo héroe
    };
    console.log('New hero added:', hero);
    this.heroSignal.set(hero);
  }
}
