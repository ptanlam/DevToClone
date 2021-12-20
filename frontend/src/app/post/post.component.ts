import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { catchError, Observable, of, tap } from 'rxjs';
import { PostDetails } from '../models';
import { PostService } from '../post.service';

@Component({
  selector: 'fm-post',
  template: ` <fm-post-grid [details]="postDetails$ | async"></fm-post-grid>`,
  providers: [PostService],
})
export class PostComponent implements OnInit {
  postDetails$!: Observable<PostDetails>;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _postService: PostService,
    private readonly _toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe({
      next: ({ id }: any) => {
        this.postDetails$ = this._postService
          .loadPostDetails$(id)
          .pipe(
            catchError((err) =>
              of(err).pipe(
                tap((err) => this._toastrService.danger(err.message))
              )
            )
          );
      },
    });
  }
}
