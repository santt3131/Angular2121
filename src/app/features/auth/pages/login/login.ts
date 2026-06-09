import { Component, computed, effect, inject, signal } from '@angular/core';
import { LoginForm } from '../../components/login-form/login-form';
import { AuthService } from '../../services/auth.services';
import { Router } from '@angular/router';
import { AuthLogin } from '../../interfaces/auth-login.interfaces';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { HEROES_PAGES } from '../../../heroes/heroes.routes';
import { NEVER } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [LoginForm],
  template: ` <div class="flex flex-col items-center bg-[cadetblue]">
    <h3 class="text-2xl font-bold text-white">Login Page!</h3>
    <app-login-form (sendLogin)="login($event)" />
    <h3 class="text-white">{{ errorMessage() }}</h3>
  </div>`,
})
export class Login {
  readonly #authService = inject(AuthService);
  readonly #router = inject(Router);
  public errorMessage = signal('');
  readonly loginSignal = signal<AuthLogin>({ username: '', password: '' });
  readonly loginResource = rxResource({
    params: () => this.loginSignal(),
    stream: ({ params }) =>
      this.#isLoginEmpty(params) ? NEVER : this.#authService.login(params),
  });

  isLoginResourceCompleted = computed(
    () => this.loginResource.status() === 'resolved',
  );

  errorLoginEffect = effect(() => {
    const httpError = this.loginResource.error() as HttpErrorResponse;
    console.log('httpError:', httpError);

    if (!httpError) {
      this.errorMessage.set('');
      return;
    }

    if (httpError.error?.msg) {
      this.errorMessage.set(httpError.error.msg);
    } else {
      this.errorMessage.set('No se pudo conectar con el servidor');
    }
  });
  navigateEffect = effect(() => {
    if (this.isLoginResourceCompleted()) {
      this.#router.navigate([HEROES_PAGES.HERO, HEROES_PAGES.HOME]);
    }
  });

  #isLoginEmpty(login: AuthLogin): boolean {
    return login.username === '' || login.password === '';
  }

  login(login: AuthLogin) {
    this.loginSignal.set(login);
  }
}
