import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, switchMap } from 'rxjs';
import { selectAuthUser } from '../auth/state';
import { PostDetails } from '../models';
import { State } from '../state';
import { PostService } from './post.service';

@Component({
  selector: 'fm-post',
  template: ` <fm-post-grid
    [details]="postDetails$ | async"
    [authorIsUser]="!!(authorIsUser$ | async)"
  ></fm-post-grid>`,
})
export class PostComponent {
  postDetails$: Observable<PostDetails> = this._route.params.pipe(
    switchMap(({ id }) => this._postService.loadPostDetails$(id))
  );

  authorIsUser$ = combineLatest({
    post: this.postDetails$,
    user: this._store.select(selectAuthUser),
  }).pipe(map(({ post, user }) => post.author.id === user.id));

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _postService: PostService,
    private readonly _store: Store<State>
  ) {}
}
