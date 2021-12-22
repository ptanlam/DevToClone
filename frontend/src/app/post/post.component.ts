import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAuthUser } from '../auth/state';
import { PostDetails } from '../models';
import { State } from '../state';
import { PostService } from './post.service';

@Component({
  selector: 'fm-post',
  template: ` <fm-post-grid
    [details]="postDetails$ | async"
    [user]="user$ | async"
    [authorIsUser]="authorIsUser"
  ></fm-post-grid>`,
  providers: [PostService],
})
export class PostComponent implements OnInit {
  postDetails$!: Observable<PostDetails>;
  user$ = this._store.select(selectAuthUser);
  authorIsUser = false;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _postService: PostService,
    private readonly _store: Store<State>
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe({
      next: ({ id }: any) => {
        this.postDetails$ = this._postService.loadPostDetails$(id);
      },
    });
  }
}
