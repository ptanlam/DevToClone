import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Post } from '../../models';

@Component({
  selector: 'fm-post-grid',
  templateUrl: './posts-grid.component.html',
  styleUrls: ['./posts-grid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsGridComponent {
  @Input() list!: Post[];
  @Input() loading!: boolean;

  @Output() fetchNextList = new EventEmitter();

  constructor() {}
}
