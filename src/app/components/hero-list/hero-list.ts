import { Component, input } from '@angular/core';
import { HeroItem } from '../hero-item/hero-item';
import { Hero } from '../../shared/interfaces/hero.interface';
import { HeroPowerstatsChange } from '../../shared/interfaces/hero-powerstats-change';

@Component({
  selector: 'app-hero-list',
  imports: [HeroItem],
  templateUrl: './hero-list.html',
  styleUrl: './hero-list.scss',
})
export class HeroList {
  heroes = input.required<Hero[]>();
  savePowerstats({ hero, powerstat, value }: HeroPowerstatsChange) {
    hero.powerstats[powerstat] += value;
  }
}
