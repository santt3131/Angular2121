import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Hero } from '../interfaces/hero.interface';
import { HeroService } from '../services/hero';
import { inject } from '@angular/core';

export const heroResolver: ResolveFn<Hero> = (route: ActivatedRouteSnapshot) => {
  const heroService = inject(HeroService);
  const hero = heroService.findOne(parseInt(route.paramMap.get('id')!, 10));
  return hero;
};
