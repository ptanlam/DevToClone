import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, tap, zip } from 'rxjs';
import { State } from '../state';
import { selectAuthAccessToken, selectAuthStatus } from './state';

@Injectable({ providedIn: 'root' })
export class AuthRouteGuard implements CanActivate {
  constructor(
    private readonly _store: Store<State>,
    private readonly _router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._store.select(selectAuthStatus).pipe(
      map((isAuthenticated) => {
        if (!isAuthenticated) return true;
        this._router.navigate(['/posts']);
        return false;
      })
    );
  }
}
