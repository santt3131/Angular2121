import { inject, Injectable } from '@angular/core';
import { Hero, PowerStat } from '../interfaces/hero.interface';
import { HeroServiceAbstract } from './hero.service.abstract';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeroService extends HeroServiceAbstract {
  // Inicializamos el BehaviorSubject con un array vacío de héroes
  readonly #heroesSubject = new BehaviorSubject<Hero[]>([]);
  //heroes$ va ser simplemente receptor y recibe el último valor emitido
  // por el BehaviorSubject, que es el array de héroes actualizado
  readonly heroes$ = this.#heroesSubject.asObservable();

  readonly #httpClient = inject(HttpClient);

  load(): Observable<{ heroes: Hero[]; total: number }> {
    return this.#httpClient.get<{ heroes: Hero[]; total: number }>(this.API_ENDPOINT).pipe(
      tap((result) => this.#heroesSubject.next(result.heroes)),
      catchError((error) => {
        console.error('Error loading heroes:', error);
        return throwError(() => error);
      }),
    );
  }
  add(hero: Hero) {
    return this.#httpClient.post<Hero>(this.API_ENDPOINT, hero).pipe(
      tap((newHero) => {
        // Actualizamos el BehaviorSubject con el nuevo héroe añadido
        const currentHeroes = this.#heroesSubject.getValue();
        this.#heroesSubject.next([...currentHeroes, newHero]);
      }),
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
        // Actualizamos el BehaviorSubject con el héroe actualizado
        const currentHeroes = this.#heroesSubject.getValue();
        const updatedHeroes = currentHeroes.map((hero) =>
          hero.id === updatedHero.id ? updatedHero : hero,
        );
        //Aqui estoy actualizando al último valor el estado de la aplicación
        //con el héroe actualizado
        this.#heroesSubject.next(updatedHeroes);
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
        // Actualizamos el BehaviorSubject eliminando el héroe removido
        const currentHeroes = this.#heroesSubject.getValue();
        const newListHeroes = currentHeroes.filter((h) => h.id !== hero.id);
        this.#heroesSubject.next(newListHeroes);
      }),
      catchError((error) => {
        console.error('Error removing hero:', error);
        return throwError(() => error);
      }),
    );
  }

  findAll(): Observable<{ heroes: Hero[]; total: number }> {
    return this.#httpClient.get<{ heroes: Hero[]; total: number }>(this.API_ENDPOINT).pipe(
      tap((result) => this.#heroesSubject.next(result.heroes)),
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
