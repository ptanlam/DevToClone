import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, switchMap } from 'rxjs';
import { AuthService } from '../auth.service';
import * as authActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _authService: AuthService
  ) {}

  logout$ = createEffect(() =>
    this._actions$.pipe(
      ofType(authActions.logout),
      switchMap(() =>
        this._authService.logout().pipe(map(() => authActions.logoutSuccess()))
      )
    )
  );

  authenticate$ = createEffect(() =>
    this._actions$.pipe(
      ofType(authActions.authenticate),
      map((action) => {
        const userId = localStorage.getItem('userId');
        const accessToken = localStorage.getItem('token');
        return { ...action, userId, accessToken };
      }),
      filter(({ userId, accessToken }) => !!userId && !!accessToken),
      switchMap(({ userId, accessToken }) =>
        this._authService.authenticate(userId!, accessToken!).pipe(
          map((user) =>
            authActions.authenticateSuccess({
              payload: { ...user, accessToken: accessToken! },
            })
          )
        )
      )
    )
  );
}
