import { Component, DestroyRef, inject } from '@angular/core';
import { HeroForm } from '../../../components/hero-form/hero-form';
import { Hero } from '../../../shared/interfaces/hero.interface';
import { HeroService } from '../../../shared/services/hero';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  readonly #destroyRef = inject(DestroyRef);

  addHero(hero: Hero) {
    console.log('New hero added:', hero);
    this.#heroService
      .add(hero)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (newHero) => {
          console.log('Hero successfully added:', newHero);
        },
        error: (error) => {
          console.error('Error adding hero:', error);
        },
        complete: () => {
          console.log('Hero creation completed');
        },
      });
    this.#router.navigate(['/home']);
  }
}
