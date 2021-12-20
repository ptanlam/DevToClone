import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { PostDetails } from './models';

@Injectable()
export class PostService {
  private readonly _serviceUrl = `${environment.backendUrl}/posts`;

  constructor(private readonly _httpClient: HttpClient) {}

  loadPostDetails$ = (id: string) =>
    this._httpClient.get<PostDetails>(`${this._serviceUrl}/${id}`);
}
