import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { authActions } from './auth/state';
import { State } from './state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private readonly _store: Store<State>) {}

  ngOnInit(): void {
    this._store.dispatch(authActions.authenticate());
  }
}
