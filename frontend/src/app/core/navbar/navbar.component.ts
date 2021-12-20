import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { filter, switchMap, tap } from 'rxjs';
import {
  authActions,
  selectAuthStatus,
  selectAuthUser,
} from '../../auth/state';
import { State } from '../../state';

@Component({
  selector: 'cm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user$ = this._store.select(selectAuthUser);
  isAuthenticated$ = this._store.select(selectAuthStatus);
  items = [{ title: 'Profile' }, { title: 'Logout' }];

  constructor(
    private readonly _store: Store<State>,
    private readonly _nbMenuService: NbMenuService,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this._nbMenuService
      .onItemClick()
      .pipe(
        filter(
          ({ tag, item }) =>
            tag === 'auth-context-menu' &&
            (item.title as string).toLocaleLowerCase() === 'logout'
        )
      )
      .subscribe({
        next: () => {
          this._store.dispatch(authActions.logout());
          this._router.navigate(['/posts']);
        },
      });

    this._nbMenuService
      .onItemClick()
      .pipe(
        filter(
          ({ tag, item }) =>
            tag === 'auth-context-menu' &&
            (item.title as string).toLocaleLowerCase() === 'profile'
        ),
        switchMap(() => this.user$)
      )
      .subscribe({
        next: (user) => {
          this._router.navigate(['/authors', user.id]);
        },
      });
  }
}
