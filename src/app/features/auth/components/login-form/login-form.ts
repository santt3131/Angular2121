import { Component, inject, output } from '@angular/core';
import { AuthLogin } from '../../interfaces/auth-login.interfaces';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.html',
})
export class LoginForm {
  sendLogin = output<AuthLogin>();
  readonly #formBuilder = inject(FormBuilder);
  public message = '';

  public loginForm: FormGroup = this.#formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  login() {
    if (this.loginForm.invalid) {
      this.message = 'Please correct all errors and resubmit the form';
    } else {
      const login: AuthLogin = this.loginForm.value;
      this.sendLogin.emit(login);
    }
  }
}
