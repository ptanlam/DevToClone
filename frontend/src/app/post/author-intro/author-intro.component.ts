import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Author, User } from '../../models';

@Component({
  selector: 'fm-post-author-intro',
  templateUrl: './author-intro.component.html',
  styleUrls: ['./author-intro.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorIntroComponent {
  @Input() author!: Author;
  @Input() user!: User | null;

  constructor() {}

  isAuthor() {
    return this.user?.id === this.author.id;
  }
}
