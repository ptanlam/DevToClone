import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { switchMap, tap } from 'rxjs';
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
  prevTerm?: string;

  private _paginationMeta: PaginationMeta = {
    currentPage: -1,
    pageSize: 10,
    totalCount: 0,
    totalPage: 0,
  };

  constructor(
    private readonly _postService: PostsService,
    private readonly _toastrService: NbToastrService,
    private readonly _route: ActivatedRoute
  ) {}

  fetchNext() {
    const { currentPage, pageSize } = this._paginationMeta;

    this._route.queryParams
      .pipe(
        tap(() => (this.loading = true)),
        switchMap(({ term }) =>
          this._postService.fetchList(currentPage + 1, pageSize, term).pipe(
            tap(({ body, headers }) => {
              if (this.prevTerm !== term) {
                this.prevTerm = term;
                this.postList = [...(body || [])];
              } else {
                this.postList = [...this.postList, ...(body || [])];
              }

              this._paginationMeta = {
                ...JSON.parse(headers.get('x-pagination') || ''),
              };
              this.loading = false;
            })
          )
        )
      )
      .subscribe({
        error: (err) => {
          this.loading = false;
          this._toastrService.danger(err.message);
        },
      });
  }
}
