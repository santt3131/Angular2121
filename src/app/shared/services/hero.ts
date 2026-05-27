import { inject, Injectable } from '@angular/core';
import { Hero, PowerStat } from '../interfaces/hero.interface';
import { HeroServiceAbstract } from './hero.service.abstract';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeroService extends HeroServiceAbstract {
  readonly #httpClient = inject(HttpClient);

  load(): Observable<{ heroes: Hero[]; total: number }> {
    return this.#httpClient.get<{ heroes: Hero[]; total: number }>(this.API_ENDPOINT).pipe(
      catchError((error) => {
        console.error('Error loading heroes:', error);
        return throwError(() => error);
      }),
    );
  }
  add(hero: Hero) {
    return this.#httpClient.post<Hero>(this.API_ENDPOINT, hero).pipe(
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
      catchError((error) => {
        console.error('Error updating hero:', error);
        return throwError(() => error);
      }),
    );
  }

  remove(hero: Hero): Observable<void> {
    return this.#httpClient.delete<void>(`${this.API_ENDPOINT}/${hero.id}`).pipe(
      catchError((error) => {
        console.error('Error removing hero:', error);
        return throwError(() => error);
      }),
    );
  }

  findAll(): Observable<{ heroes: Hero[]; total: number }> {
    return this.#httpClient.get<{ heroes: Hero[]; total: number }>(this.API_ENDPOINT).pipe(
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
