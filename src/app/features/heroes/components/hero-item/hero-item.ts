import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeroPowerstatsChange } from '../../interfaces/hero-powerstats-change';
import { Hero, PowerStat } from '../../interfaces/hero.interface';
import { HEROES_PAGES } from '../../heroes.routes';

@Component({
  selector: 'app-hero-item',
  imports: [CommonModule, RouterLink],
  templateUrl: './hero-item.html',
})
export class HeroItem {
  hero = input.required<Hero>();
  readonly = input<boolean>(false);
  powerstatsChange = output<HeroPowerstatsChange>();
  isHeroVillain = computed(() => this.hero().alignment === 'bad');
  removeHero = output<Hero>();
  navigation = computed(() => ({
    update: [HEROES_PAGES.HERO, HEROES_PAGES.UPDATE, this.hero().id],
    view: [HEROES_PAGES.HERO, this.hero().id],
    back: [HEROES_PAGES.HERO],
  }));

  decrementPowerStats(powerstat: PowerStat): void {
    this.powerstatsChange.emit({ hero: this.hero(), powerstat, value: -1 });
  }

  incrementPowerStats(powerstat: PowerStat): void {
    this.powerstatsChange.emit({ hero: this.hero(), powerstat, value: +1 });
  }

  remove(hero: Hero): void {
    this.removeHero.emit(hero);
  }
}
