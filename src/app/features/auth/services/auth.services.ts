import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthLogin } from '../interfaces/auth-login.interfaces';
import { TokenStorageService } from '../../../shared/services/token-storage.service';

@Injectable({
  providedIn: 'root', //Singleton Global- Angular creará una única instancia de AuthService para toda la aplicación
})
export class AuthService {
  readonly #API_ENDPOINT = 'http://localhost:9000/user';
  readonly #httpClient = inject(HttpClient);
  readonly #tokenStorageService = inject(TokenStorageService);

  login(user: AuthLogin): Observable<AuthLogin> {
    return this.#httpClient
      .post<AuthLogin>(`${this.#API_ENDPOINT}/login`, user)
      .pipe(
        map((res: any) => {
          this.#tokenStorageService.token = res.token;
          return res;
        }),
      );
  }

  register(user: AuthLogin): Observable<AuthLogin> {
    return this.#httpClient.post<AuthLogin>(
      `${this.#API_ENDPOINT}/register`,
      user,
    );
  }
}
