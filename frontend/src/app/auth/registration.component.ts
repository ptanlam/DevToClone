import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { of, switchMap, tap } from 'rxjs';
import { State } from '../state';
import { AuthService } from './auth.service';
import { selectAuthStatus } from './state';

@Component({
  selector: 'fm-registration',
  template: `
    <fm-registration-form
      [form]="form"
      [registering]="registering"
      (submit)="onSubmit()"
    ></fm-registration-form>
  `,
})
export class RegistrationComponent implements OnInit {
  registering = false;
  form!: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _location: Location,
    private readonly _nBToastrService: NbToastrService,
    private readonly _store: Store<State>
  ) {
    this.form = formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      username: [
        '',
        [
          Validators.minLength(3),
          Validators.maxLength(250),
          Validators.required,
        ],
      ],
      password: [
        '',
        [
          Validators.minLength(8),
          Validators.maxLength(250),
          Validators.required,
        ],
      ],
      confirmationPassword: ['', [Validators.required]],
    });

    this._store.select(selectAuthStatus).subscribe({
      next: (isAuthenticated) => {
        if (!isAuthenticated) return;
        this._location.back();
      },
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.form.valid) return;

    const { email, username, password } = this.form.value;
    of(true)
      .pipe(
        tap(() => (this.registering = true)),
        switchMap(() => this._authService.register(email, username, password))
      )
      .subscribe({
        next: () => {
          this.registering = false;
          this._router.navigate(['/auth/login']);
          this._nBToastrService.success('Create account successfully.');
        },
        error: ({ error }) => {
          this.registering = false;
          this._nBToastrService.danger(error.message);
        },
      });
  }
}
