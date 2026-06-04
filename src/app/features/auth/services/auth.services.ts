import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthLogin } from '../interfaces/auth-login.interfaces';

@Injectable({
  providedIn: 'root', //Singleton Global- Angular creará una única instancia de AuthService para toda la aplicación
})
export class AuthService {
  readonly #API_ENDPOINT = 'http://localhost:9000/user';
  readonly #httpClient = inject(HttpClient);

  login(user: AuthLogin): Observable<AuthLogin> {
    return this.#httpClient.post<AuthLogin>(
      `${this.#API_ENDPOINT}/login`,
      user,
    );
  }

  register(user: AuthLogin): Observable<AuthLogin> {
    return this.#httpClient.post<AuthLogin>(
      `${this.#API_ENDPOINT}/register`,
      user,
    );
  }
}
