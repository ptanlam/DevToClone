import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Tag } from '../../models';

@Component({
  selector: 'sm-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagListComponent {
  private readonly _tagTypes = [
    'basic',
    'primary',
    'success',
    'info',
    'warning',
    'danger',
  ];

  @Input() tags!: Tag[];

  getTagType() {
    return this._tagTypes[Math.round(Math.random() * this._tagTypes.length)];
  }
}
