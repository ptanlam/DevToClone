import { Component } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { PostsService } from './posts.service';

@Component({
  selector: 'fm-posts',
  template: `
    <fm-post-grid [list]="postList$ | async" (fetchNextList)="fetchNext()">
    </fm-post-grid>
  `,
})
export class PostsComponent {
  postList$ = this._postService.list$;

  constructor(
    private readonly _postService: PostsService,
    private readonly _toastrService: NbToastrService
  ) {}

  fetchNext() {
    this._postService
      .fetchList$()
      .subscribe({ error: (err) => this._toastrService.danger(err.message) });
  }
}
