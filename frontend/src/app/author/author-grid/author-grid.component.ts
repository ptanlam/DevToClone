import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Post, User } from '../../models';

@Component({
  selector: 'fm-author-grid',
  templateUrl: './author-grid.component.html',
  styleUrls: ['./author-grid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorGridComponent {
  @Input() author!: User | null;
  @Input() postList!: Post[] | null;
  @Input() isUser!: boolean | null;
  @Input() loading!: boolean;

  @Output() fetchNext = new EventEmitter();

  constructor() {}
}
