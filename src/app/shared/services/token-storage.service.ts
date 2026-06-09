import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  #isLogin = signal(false);
  readonly isLogin = computed(() => this.#isLogin());
  #token = localStorage.getItem('heroes-token') || '';

  constructor() {
    //accede al getter token
    if (this.token) {
      this.#isLogin.set(true);
    }
  }

  set token(token: string) {
    this.#token = token;
    localStorage.setItem('heroes-token', token);
    const logged = token !== '';
    this.#isLogin.set(logged);
  }

  get token(): string {
    return this.#token;
  }

  logout() {
    this.token = ''; // Aqui estoy llamando a set token
  }
}
