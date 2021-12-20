import { Component, Input, OnInit } from '@angular/core';
import { PostDetails } from '../../models';

@Component({
  selector: 'fm-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent implements OnInit {
  @Input() details!: PostDetails | null;

  constructor() {}

  ngOnInit(): void {}
}
