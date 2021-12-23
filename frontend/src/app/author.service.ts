import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Post, User } from './models';

@Injectable()
export class AuthorService {
  private readonly _serviceUrl = `${environment.backendUrl}/authors`;

  constructor(private readonly _httpClient: HttpClient) {}

  getProfile(id: string) {
    return this._httpClient.get<User>(`${this._serviceUrl}/${id}`);
  }

  getPublishedPostList(authorId: string, pageNumber: number, pageSize: number) {
    return this._httpClient.get<Post[]>(
      `${this._serviceUrl}/${authorId}/published-posts?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        observe: 'response',
      }
    );
  }

  getPostList(authorId: string, pageNumber: number, pageSize: number) {
    return this._httpClient.get<Post[]>(
      `${this._serviceUrl}/${authorId}/posts?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        observe: 'response',
      }
    );
  }
}
