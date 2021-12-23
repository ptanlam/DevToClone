import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { combineLatest, iif, map, switchMap, tap } from 'rxjs';
import { selectAuthUser } from '../auth/state';
import { AuthorService } from '../author.service';
import { PaginationMeta, Post } from '../models';
import { State } from '../state';

@Component({
  selector: 'fm-author',
  template: `
    <fm-author-grid
      [postList]="postList"
      [author]="author$ | async"
      [isUser]="(isUser$ | async) || false"
      [loading]="loading"
      (fetchNext)="fetchPostList()"
    ></fm-author-grid>
  `,
  styles: [],
  providers: [AuthorService],
})
export class AuthorComponent {
  postList: Post[] = [];
  author$ = this._route.params.pipe(
    map((params) => params['id'] as string),
    switchMap((id) => this._authorService.getProfile(id))
  );
  loading = false;

  isUser$ = combineLatest([
    this._store.select(selectAuthUser),
    this._route.params,
  ]).pipe(map(([user, { id }]) => user.id === id));

  private _paginationMeta: PaginationMeta = {
    currentPage: -1,
    pageSize: 10,
    totalCount: 0,
    totalPage: 0,
  };

  constructor(
    private readonly _authorService: AuthorService,
    private readonly _route: ActivatedRoute,
    private readonly _store: Store<State>,
    private readonly _toastrService: NbToastrService
  ) {}

  fetchPostList() {
    const { pageSize, currentPage } = this._paginationMeta;

    combineLatest([this._route.params, this.isUser$])
      .pipe(
        tap(() => (this.loading = true)),
        switchMap(([{ id }, isUser]) =>
          iif(
            () => isUser,
            this._authorService.getPostList(id, currentPage + 1, pageSize),
            this._authorService.getPublishedPostList(
              id,
              currentPage + 1,
              pageSize
            )
          )
        )
      )
      .subscribe({
        next: ({ body, headers }) => {
          this.postList = [...this.postList, ...(body || [])];
          this._paginationMeta = {
            ...JSON.parse(headers.get('x-pagination') || ''),
          };
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this._toastrService.danger('Something wrong happened.');
        },
      });
  }
}
