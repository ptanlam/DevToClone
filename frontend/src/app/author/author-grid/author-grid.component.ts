import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Post, User } from '../../models';

@Component({
  selector: 'fm-author-grid',
  templateUrl: './author-grid.component.html',
  styleUrls: ['./author-grid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorGridComponent implements OnInit {
  @Input() author!: User | null;
  @Input() postList!: Post[] | null;
  @Input() isUser!: boolean | null;

  constructor() {}

  ngOnInit(): void {}
}
