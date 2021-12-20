import { Component, Input, OnInit } from '@angular/core';
import { PostDetails } from '../../models';

@Component({
  selector: 'fm-post-grid',
  templateUrl: './post-grid.component.html',
  styleUrls: ['./post-grid.component.css'],
})
export class PostGridComponent implements OnInit {
  @Input() details!: PostDetails | null;

  constructor() {}

  ngOnInit(): void {}
}
