import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, of, switchMap, zip } from 'rxjs';
import { environment } from '../../../environments/environment';
import { selectAuthAccessToken, selectAuthStatus } from '../../auth/state';
import { State } from '../../state';

@Injectable({ providedIn: 'root' })
export class FilesService {
  private readonly _serviceUrl = `${environment.backendUrl}/files`;

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _store: Store<State>
  ) {}

  upload$ = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    return zip(
      this._store.select(selectAuthStatus),
      this._store.select(selectAuthAccessToken)
    ).pipe(
      filter(([isAuthenticated]) => isAuthenticated),
      switchMap(([_, accessToken]) =>
        this._httpClient
          .post<{ url: string }>(this._serviceUrl, formData, {
            headers: { authorization: `Bearer ${accessToken}` },
          })
          .pipe(map(({ url }) => `![](${url})`))
      )
    );

    // return of('hi');
  };
}
