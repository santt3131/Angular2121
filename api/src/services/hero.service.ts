import { Hero } from '../interfaces/hero.interface';
import { autoInjectable } from 'tsyringe';
import { heroes } from '../heroes-db-lite';

@autoInjectable()
export class HeroService {
  #fakeID = 1000;
  #heroes: Hero[] = heroes;

  findAll(page: number, limit: number): { heroes: Hero[]; total: number } {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedHeroes = this.#heroes.slice(startIndex, endIndex);
    return {
      heroes: paginatedHeroes,
      total: this.#heroes.length,
    };
  }

  findOne(id: number): Hero | undefined {
    const ID = this.#convertID(id);
    return this.#heroes.find((hero) => hero.id === ID) || ({} as Hero);
  }

  add(hero: Hero): Hero {
    this.#fakeID++;
    hero.id = hero.id ?? this.#fakeID;
    this.#heroes = [hero, ...this.#heroes];
    return hero;
  }

  delete(id: number): void {
    const hero = this.#find(id);
    if (this.#isNull(hero)) {
      throw new Error('Hero not found');
    }
    this.#heroes = this.#heroes.filter((h) => h.id !== hero.id);
  }

  #find(id: number): Hero {
    return this.#heroes.find((hero) => hero.id === id) || ({} as Hero);
  }

  #isNull(hero: Hero): boolean {
    return Object.keys(hero).length === 0;
  }

  update(id: number, updatedHero: Hero | Partial<Hero>): Hero | undefined {
    const hero = this.#find(id);
    if (this.#isNull(hero)) {
      throw new Error('Hero not found');
    }
    let updatedHeroResult: Hero | undefined;
    this.#heroes = this.#heroes.map((hero) => {
      if (hero.id !== id) {
        return hero;
      }

      updatedHeroResult = {
        ...hero,
        ...updatedHero,
        powerstats: {
          ...hero.powerstats,
          ...updatedHero.powerstats,
        },
      };
      return updatedHeroResult;
    });
    return updatedHeroResult;
  }

  #convertID(id: string | number): number {
    return typeof id === 'string' ? parseInt(id, 10) : id;
  }
}
