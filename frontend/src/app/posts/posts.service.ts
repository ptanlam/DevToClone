import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  concatMap,
  filter,
  forkJoin,
  of,
  switchMap,
  tap,
  zip,
} from 'rxjs';
import { environment } from '../../environments/environment';
import {
  selectAuthAccessToken,
  selectAuthStatus,
  selectAuthUser,
} from '../auth/state';
import { PaginationMeta, Post } from '../models';
import { State } from '../state';

@Injectable()
export class PostsService {
  private readonly _serviceUrl = `${environment.backendUrl}/posts`;

  private _paginationMeta: PaginationMeta = {
    currentPage: -1,
    pageSize: 10,
    totalCount: 0,
    totalPage: 0,
  };

  private _list: Post[] = [];
  private _listSubject$ = new BehaviorSubject<Post[]>(this._list);
  list$ = this._listSubject$.asObservable();

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _store: Store<State>
  ) {}

  createNew$ = (title: string, content: string, published: boolean) =>
    forkJoin({
      isAuthenticated: this._store.select(selectAuthStatus),
      accessToken: this._store.select(selectAuthAccessToken),
      user: this._store.select(selectAuthUser),
    }).pipe(
      filter(({ isAuthenticated }) => isAuthenticated),
      concatMap(({ accessToken, user }) =>
        this._httpClient
          .post<Post>(
            this._serviceUrl,
            {
              title,
              content,
              published,
              authorId: user.id,
            },
            { headers: { authorization: `Bearer ${accessToken}` } }
          )
          .pipe(
            tap((post) => {
              if (!published) return;
              this._list = [post, ...this._list];
              this._listSubject$.next(this._list);
            })
          )
      )
    );

  fetchList$ = (pageNumber = this._paginationMeta.currentPage + 1) =>
    of(this._paginationMeta.currentPage < this._paginationMeta.totalPage).pipe(
      filter((hasNext) => hasNext),
      switchMap(() =>
        this._httpClient
          .get<Post[]>(
            `${this._serviceUrl}?pageSize=${this._paginationMeta.pageSize}&pageNumber=${pageNumber}`,
            { observe: 'response' }
          )
          .pipe(
            filter(({ body }) => !!body),
            tap(({ body, headers }) => {
              this._paginationMeta = {
                ...JSON.parse(headers.get('x-pagination') || ''),
              };

              this._list = [...this._list, ...body!];
              this._listSubject$.next(this._list);
            })
          )
      )
    );
}
