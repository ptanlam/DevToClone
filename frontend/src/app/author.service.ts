import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, of, switchMap, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { PaginationMeta, Post, User } from './models';

@Injectable()
export class AuthorService {
  private readonly _serviceUrl = `${environment.backendUrl}/authors`;

  private _profile: User = { id: '', userName: '', avatarUrl: '', email: '' };
  private _profileSubject$ = new BehaviorSubject<User>(this._profile);
  profile$ = this._profileSubject$.asObservable();

  private _paginationMeta: PaginationMeta = {
    currentPage: -1,
    pageSize: 5,
    totalCount: 0,
    totalPage: 0,
  };

  private _postList: Post[] = [];
  private _postListSubject$ = new BehaviorSubject<Post[]>(this._postList);
  postList$ = this._postListSubject$.asObservable();

  constructor(private readonly _httpClient: HttpClient) {}

  getProfile$ = (id: string) =>
    this._httpClient.get<User>(`${this._serviceUrl}/${id}`).pipe(
      tap((resp) => {
        this._profile = { ...resp };
        this._profileSubject$.next(this._profile);
      })
    );

  getPostList$ = (
    id: string,
    pageNumber = this._paginationMeta.currentPage + 1
  ) =>
    of(this._paginationMeta.currentPage < this._paginationMeta.totalPage).pipe(
      switchMap(() =>
        this._httpClient
          .get<Post[]>(
            `${this._serviceUrl}/${id}/posts?pageNumber=${pageNumber}&pageSize=${this._paginationMeta.pageSize}`,
            {
              observe: 'response',
            }
          )
          .pipe(
            filter(({ body }) => !!body),
            tap(({ body, headers }) => {
              this._paginationMeta = {
                ...JSON.parse(headers.get('x-pagination') || ''),
              };

              this._postList = [...this._postList, ...body!];
              this._postListSubject$.next(this._postList);
            })
          )
      )
    );
}
