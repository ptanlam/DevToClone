import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '../../models';

@Component({
  selector: 'fm-author-banner',
  templateUrl: './author-banner.component.html',
  styleUrls: ['./author-banner.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorBannerComponent {
  @Input() author!: User;
  @Input() isUser!: boolean;
}
