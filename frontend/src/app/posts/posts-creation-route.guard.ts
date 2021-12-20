import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { selectAuthStatus } from '../auth/state';
import { State } from '../state';

@Injectable({ providedIn: 'root' })
export class PostsCreationRouteGuard implements CanActivate {
  constructor(
    private readonly _store: Store<State>,
    private readonly _router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this._store.select(selectAuthStatus).pipe(
      map((isAuthenticated) => {
        if (isAuthenticated) return true;
        this._router.navigate(['/auth/login']);
        return false;
      })
    );
  }
}
