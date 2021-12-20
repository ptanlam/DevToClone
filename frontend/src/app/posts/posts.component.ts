import { Component } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { concatMap, of, tap } from 'rxjs';
import { PaginationMeta, Post } from '../models';
import { PostsService } from './posts.service';

@Component({
  selector: 'fm-posts',
  template: `
    <fm-post-grid
      [list]="postList"
      [loading]="loading"
      (fetchNextList)="fetchNext()"
    >
    </fm-post-grid>
  `,
})
export class PostsComponent {
  postList: Post[] = [];
  loading = false;
  private _paginationMeta: PaginationMeta = {
    currentPage: -1,
    pageSize: 10,
    totalCount: 0,
    totalPage: 0,
  };

  constructor(
    private readonly _postService: PostsService,
    private readonly _toastrService: NbToastrService
  ) {}

  fetchNext() {
    const { currentPage, pageSize } = this._paginationMeta;

    of(true)
      .pipe(
        tap(() => (this.loading = true)),
        concatMap(() => this._postService.fetchList(currentPage + 1, pageSize))
      )
      .subscribe({
        next: ({ body, headers }) => {
          this.postList = [...this.postList, ...(body || [])];
          this._paginationMeta = {
            ...JSON.parse(headers.get('x-pagination') || ''),
          };
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this._toastrService.danger(err.message);
        },
      });
  }
}
