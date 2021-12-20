import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models';

@Injectable()
export class AuthService {
  private readonly _serviceUrl = `${environment.backendUrl}`;

  constructor(private readonly _httpClient: HttpClient) {}

  register(email: string, username: string, password: string) {
    return this._httpClient.post(`${this._serviceUrl}/register`, {
      email,
      username,
      password,
    });
  }

  login(email: string, password: string) {
    return this._httpClient
      .post<User & { accessToken: string }>(`${this._serviceUrl}/login`, {
        email,
        password,
      })
      .pipe(tap(({ accessToken, id }) => this.setCredentials(id, accessToken)));
  }

  authenticate(id: string, accessToken: string) {
    return this._httpClient
      .get<User>(`${this._serviceUrl}/users/${id}`, {
        headers: { authorization: `Bearer ${accessToken}` },
      })
      .pipe(
        tap((resp) => this.setCredentials(resp.id, accessToken)),
        catchError(() => of().pipe(tap(this.removeCredentials)))
      );
  }

  logout() {
    return of(true).pipe(tap(this.removeCredentials));
  }

  private setCredentials(userId: string, accessToken: string) {
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', accessToken);
  }

  private removeCredentials() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
}
