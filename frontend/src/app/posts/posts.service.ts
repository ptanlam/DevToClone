import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Post } from '../models';

@Injectable()
export class PostsService {
  private readonly _serviceUrl = `${environment.backendUrl}/posts`;

  constructor(private readonly _httpClient: HttpClient) {}

  createNew(
    title: string,
    content: string,
    published: boolean,
    accessToken: string,
    authorId: string
  ) {
    return this._httpClient.post<Post>(
      this._serviceUrl,
      {
        title,
        content,
        published,
        authorId,
      },
      { headers: { authorization: `Bearer ${accessToken}` } }
    );
  }

  fetchList(pageNumber: number, pageSize: number) {
    return this._httpClient.get<Post[]>(
      `${this._serviceUrl}?pageSize=${pageSize}&pageNumber=${pageNumber}`,
      { observe: 'response' }
    );
  }
}
