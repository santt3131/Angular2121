import { Component, inject } from '@angular/core';
import { HeroForm } from '../../../components/hero-form/hero-form';
import { Hero } from '../../../shared/interfaces/hero.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-update',
  imports: [HeroForm],
  template: ` <div class="flex flex-col items-center bg-[rgb(94,104,255)] p-4 rounded-lg mb-4">
    <h3 class="text-2xl font-bold text-white">Update Hero</h3>
    <app-hero-form (sendHero)="updateHero($event)" />
  </div>`,
})
export class HeroUpdate {
  readonly #router = inject(Router);
  updateHero(_hero: any) {
    const hero: Hero = {
      ..._hero,
      id: Math.floor(Math.random() * 1000) + 1,
    };
    console.log('Updated Hero:', hero);
    this.#router.navigate(['/home']);
  }
}
