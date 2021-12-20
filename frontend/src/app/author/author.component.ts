import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, mergeMap, Subscription, tap, zip } from 'rxjs';
import { selectAuthUser } from '../auth/state';
import { AuthorService } from '../author.service';
import { State } from '../state';

@Component({
  selector: 'fm-author',
  template: `
    <fm-author-grid
      [postList]="postList$ | async"
      [author]="profile$ | async"
      [isUser]="isUser$ | async"
    ></fm-author-grid>
  `,
  styles: [],
  providers: [AuthorService],
})
export class AuthorComponent implements OnInit, OnDestroy {
  postList$ = this._authorService.postList$;
  profile$ = this._authorService.profile$;
  isUser$ = zip(this._store.select(selectAuthUser), this._route.params).pipe(
    map(([user, { id }]) => user.id === id)
  );

  private _subscription!: Subscription;

  constructor(
    private readonly _authorService: AuthorService,
    private readonly _route: ActivatedRoute,
    private readonly _store: Store<State>
  ) {}

  ngOnInit(): void {
    this._subscription = this._route.params
      .pipe(
        map((params) => params['id'] as string),
        mergeMap((id) =>
          zip(
            this._authorService.getProfile$(id),
            this._authorService.getPostList$(id)
          )
        )
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
