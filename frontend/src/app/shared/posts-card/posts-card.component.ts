import { Component, Input } from '@angular/core';
import { Post } from '../../models';

@Component({
  selector: 'sm-post-card',
  templateUrl: './posts-card.component.html',
  styleUrls: ['./posts-card.component.css'],
})
export class PostsCardComponent {
  @Input() post!: Post;

  constructor() {}
}
