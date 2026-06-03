import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { HeroServiceAbstract } from './hero.service.abstract';
import { Hero, PowerStat } from '../interfaces/hero.interface';

@Injectable({
  providedIn: 'root',
})
export class HeroService extends HeroServiceAbstract {
  readonly #heroesSignal = signal<Hero[]>([]);
  //Computed me permite crear una señal derivada
  readonly heroes = computed(() => this.#heroesSignal());

  readonly #httpClient = inject(HttpClient);

  #buildParams(page = 1, limit = 600) {
    return new HttpParams({
      fromObject: {
        page: page.toString(),
        limit: limit.toString(),
      },
    });
  }

  load(): Observable<{ heroes: Hero[]; total: number }> {
    return this.findAll({ page: 1, limit: 600 });
  }

  add(hero: Hero) {
    return this.#httpClient.post<Hero>(this.API_ENDPOINT, hero).pipe(
      tap((newHero) => this.#heroesSignal.update((currentHeroes) => [...currentHeroes, newHero])),
      catchError((error) => {
        console.error('Error loading heroes:', error);
        return throwError(() => error);
      }),
    );
  }

  updatePowerstat(hero: Hero, powerstat: PowerStat, value: number): Observable<Hero> {
    const heroToUpdate = {
      ...hero,
      powerstats: {
        ...hero.powerstats,
        [powerstat]: hero.powerstats[powerstat] + value,
      },
    };

    return this.update(heroToUpdate);
  }

  update(heroToUpdate: Hero): Observable<Hero> {
    return this.#httpClient.put<Hero>(`${this.API_ENDPOINT}/${heroToUpdate.id}`, heroToUpdate).pipe(
      tap((updatedHero) => {
        this.#heroesSignal.update((currentHeroes) =>
          currentHeroes.map((hero) => (hero.id === updatedHero.id ? updatedHero : hero)),
        );
      }),
      catchError((error) => {
        console.error('Error updating hero:', error);
        return throwError(() => error);
      }),
    );
  }

  remove(hero: Hero): Observable<void> {
    return this.#httpClient.delete<void>(`${this.API_ENDPOINT}/${hero.id}`).pipe(
      tap(() => {
        this.#heroesSignal.update((currentHeroes) => currentHeroes.filter((h) => h.id !== hero.id));
      }),
      catchError((error) => {
        console.error('Error removing hero:', error);
        return throwError(() => error);
      }),
    );
  }

  findAll(params?: { page: number; limit: number }): Observable<{ heroes: Hero[]; total: number }> {
    const httpParams = this.#buildParams(params?.page ?? 1, params?.limit ?? 600);
    return this.#httpClient
      .get<{ heroes: Hero[]; total: number }>(this.API_ENDPOINT, { params: httpParams })
      .pipe(
        tap((result) => this.#heroesSignal.set(result.heroes)),
        catchError((error) => {
          console.error('Error loading heroes:', error);
          return throwError(() => error);
        }),
      );
  }

  findOne(id: number): Observable<Hero> {
    return this.#httpClient.get<Hero>(`${this.API_ENDPOINT}/${id}`).pipe(
      catchError((error) => {
        console.error('Error loading hero:', error);
        return throwError(() => error);
      }),
    );
  }
}
