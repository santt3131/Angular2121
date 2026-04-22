import { Component, computed, inject } from '@angular/core';
import { HeroForm } from '../../../components/hero-form/hero-form';
import { Hero } from '../../../shared/interfaces/hero.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroService } from '../../../shared/services/hero';
import { HeroItemNotFound } from '../../../components/hero-item-not-found/hero-item-not-found';

@Component({
  selector: 'app-hero-update',
  imports: [HeroForm, HeroItemNotFound],
  template: `
    @if (this.isValidHero()) {
      <div class="flex flex-col items-center bg-[rgb(94,104,255)] p-4 rounded-lg mb-4">
        <h3 class="text-2xl font-bold text-white">Update Hero</h3>
        <app-hero-form [hero]="hero" (sendHero)="updateHero($event)" />
      </div>
    } @else {
      <app-hero-item-not-found />
    }
  `,
})
export class HeroUpdate {
  readonly #heroService = inject(HeroService);
  readonly #router = inject(Router);
  readonly #activatedRoute = inject(ActivatedRoute);
  hero: Hero = this.#activatedRoute.snapshot.data['hero'];
  isValidHero = computed(() => !this.#heroService.isNullHero(this.hero));

  updateHero(hero: any) {
    console.log('Updated Hero:', hero);
    this.#heroService.update(hero);
    this.#router.navigate(['/home']);
  }
}
