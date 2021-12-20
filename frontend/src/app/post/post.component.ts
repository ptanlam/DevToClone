import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { catchError, Observable, of, tap } from 'rxjs';
import { selectAuthUser } from '../auth/state';
import { PostDetails } from '../models';
import { PostService } from '../post.service';
import { State } from '../state';

@Component({
  selector: 'fm-post',
  template: ` <fm-post-grid
    [details]="postDetails$ | async"
    [user]="user$ | async"
  ></fm-post-grid>`,
  providers: [PostService],
})
export class PostComponent implements OnInit {
  postDetails$!: Observable<PostDetails>;
  user$ = this._store.select(selectAuthUser);

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _postService: PostService,
    private readonly _toastrService: NbToastrService,
    private readonly _store: Store<State>
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
