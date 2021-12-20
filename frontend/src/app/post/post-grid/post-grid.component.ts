import { Component, Input, OnInit } from '@angular/core';
import { PostDetails, User } from '../../models';

@Component({
  selector: 'fm-post-grid',
  templateUrl: './post-grid.component.html',
  styleUrls: ['./post-grid.component.css'],
})
export class PostGridComponent implements OnInit {
  @Input() details!: PostDetails | null;
  @Input() user!: User | null;

  constructor() {}

  ngOnInit(): void {}
}
