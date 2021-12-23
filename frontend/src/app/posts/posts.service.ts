import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Post, Tag } from '../models';

@Injectable()
export class PostsService {
  private readonly _serviceUrl = `${environment.backendUrl}/posts`;

  constructor(private readonly _httpClient: HttpClient) {}

  createNew(
    title: string,
    content: string,
    published: boolean,
    accessToken: string,
    authorId: string,
    tags: Pick<Tag, 'name'>[]
  ) {
    return this._httpClient.post<Post>(
      this._serviceUrl,
      {
        title,
        content,
        published,
        authorId,
        tags,
      },
      { headers: { authorization: `Bearer ${accessToken}` } }
    );
  }

  fetchList(pageNumber: number, pageSize: number, term?: string) {
    return this._httpClient.get<Post[]>(
      `${this._serviceUrl}?pageSize=${pageSize}&pageNumber=${pageNumber}&term=${
        term || ''
      }`,
      { observe: 'response' }
    );
  }
}
