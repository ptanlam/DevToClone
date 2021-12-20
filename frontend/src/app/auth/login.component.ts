import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, of, switchMap, tap } from 'rxjs';
import { State } from '../state';
import { AuthService } from './auth.service';
import { authActions } from './state';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'fm-login',
  template: `
    <fm-login-form
      [form]="form"
      [logging]="logging"
      (login)="onLogin()"
    ></fm-login-form>
  `,
})
export class LoginComponent {
  form: FormGroup;
  logging = false;

  constructor(
    formBuilder: FormBuilder,
    private readonly _store: Store<State>,
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _toastrService: NbToastrService
  ) {
    this.form = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    if (!this.form.valid) return;

    const { email, password } = this.form.value;
    of(true)
      .pipe(
        tap(() => (this.logging = true)),
        switchMap(() => this._authService.login(email, password))
      )
      .subscribe({
        next: (resp) => {
          this._store.dispatch(authActions.loginSuccess({ payload: resp }));
          this._router.navigate(['/posts']);
          this.logging = false;
        },
        error: ({ error }) => {
          this.logging = false;
          this._toastrService.danger(error);
        },
      });
  }
}
