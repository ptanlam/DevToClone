import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PostDetails, Tag } from '../models';

@Injectable()
export class PostService {
  private readonly _serviceUrl = `${environment.backendUrl}/posts`;

  constructor(private readonly _httpClient: HttpClient) {}

  loadPostDetails$ = (id: string) =>
    this._httpClient.get<PostDetails>(`${this._serviceUrl}/${id}`);

  updatePost(
    id: string,
    title: string,
    content: string,
    published: boolean,
    tags: Pick<Tag, 'name'>[],
    accessToken: string
  ) {
    return this._httpClient.patch<PostDetails>(
      `${this._serviceUrl}/${id}`,
      {
        title,
        content,
        published,
        tags,
      },
      { headers: { authorization: `Bearer ${accessToken}` } }
    );
  }

  deletePost(id: string, accessToken: string) {
    return this._httpClient.delete(`${this._serviceUrl}/${id}`, {
      headers: { authorization: `Bearer ${accessToken}` },
    });
  }
}
