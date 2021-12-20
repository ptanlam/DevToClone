import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { map, switchMap, tap, zip } from 'rxjs';
import { selectAuthUser } from '../auth/state';
import { AuthorService } from '../author.service';
import { PaginationMeta, Post, User } from '../models';
import { State } from '../state';

@Component({
  selector: 'fm-author',
  template: `
    <fm-author-grid
      [postList]="postList"
      [author]="profile"
      [isUser]="isUser$ | async"
      [loading]="loading"
      (fetchNext)="fetchPostList()"
    ></fm-author-grid>
  `,
  styles: [],
  providers: [AuthorService],
})
export class AuthorComponent implements OnInit {
  postList: Post[] = [];
  profile!: User;
  loading = false;

  isUser$ = zip(this._store.select(selectAuthUser), this._route.params).pipe(
    map(([user, { id }]) => user.id === id)
  );

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

  ngOnInit(): void {
    this._route.params.pipe(map((params) => params['id'] as string)).subscribe({
      next: (id) =>
        this._authorService.getProfile(id).subscribe({
          next: (profile) => (this.profile = profile),
          error: () => this._toastrService.danger('Something wrong happened.'),
        }),
    });
  }

  fetchPostList() {
    const { pageSize, currentPage } = this._paginationMeta;

    this._route.params
      .pipe(
        tap(() => (this.loading = true)),
        map((params) => params['id'] as string),
        switchMap((id) =>
          this._authorService.getPostList(id, currentPage + 1, pageSize)
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
