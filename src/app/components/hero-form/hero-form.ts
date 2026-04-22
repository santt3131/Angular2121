import { Component, computed, inject, input, output, Signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Hero } from '../../shared/interfaces/hero.interface';
import { heroNameValidator } from '../../shared/validators/hero-name.validator';
import { TitleCasePipe } from '@angular/common';
import { HeroService } from '../../shared/services/hero';

@Component({
  selector: 'app-hero-form',
  imports: [ReactiveFormsModule, TitleCasePipe],
  templateUrl: './hero-form.html',
  styleUrl: './hero-form.scss',
})
export class HeroForm {
  readonly #heroService = inject(HeroService);
  add = output<Hero>({ alias: 'sendHero' });
  hero = input<Hero>(this.#heroService.defaultHero); //inicialmente ya tengo el valor de defaultHero, pero si se le pasa un hero por input, se actualiza el valor de hero
  readonly #formBuilder = inject(FormBuilder);
  message = '';
  textButton = computed(() => (this.#heroService.isDefaultHero(this.hero()) ? 'Create' : 'Update'));

  powerstats = ['combat', 'durability', 'intelligence', 'power', 'speed', 'strength'];

  heroForm: Signal<FormGroup> = computed(() =>
    this.#formBuilder.group({
      name: [this.hero().name, Validators.required, heroNameValidator],
      image: [this.hero().image],
      alignment: [this.hero().alignment],
      powerstats: this.#formBuilder.group({
        intelligence: [
          this.hero().powerstats.intelligence,
          [Validators.required, Validators.max(100), Validators.min(0)],
        ],
        strength: [
          this.hero().powerstats.strength,
          [Validators.required, Validators.max(100), Validators.min(0)],
        ],
        speed: [
          this.hero().powerstats.speed,
          [Validators.required, Validators.max(100), Validators.min(0)],
        ],
        durability: [
          this.hero().powerstats.durability,
          [Validators.required, Validators.max(100), Validators.min(0)],
        ],
        power: [
          this.hero().powerstats.power,
          [Validators.required, Validators.max(100), Validators.min(0)],
        ],
        combat: [
          this.hero().powerstats.combat,
          [Validators.required, Validators.max(100), Validators.min(0)],
        ],
      }),
    }),
  );

  addHero() {
    if (this.heroForm().invalid) {
      this.message = 'Please correct all errors and resubmit the form ';
    } else {
      const hero: Hero = {
        id: this.hero().id, // Mantener el mismo ID para actualizaciones
        powerstats: { ...this.heroForm().value.powerstats },
        ...this.heroForm().value,
      };
      console.log('Creating Hero', hero);
      this.add.emit(hero);
    }
  }
}
