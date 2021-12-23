import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'fm-post-update-form',
  templateUrl: './post-update-form.component.html',
  styleUrls: ['./post-update-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostUpdateFormComponent {
  @Input() updateForm!: FormGroup;
  @Input() imageUrl!: string | null;
  @Input() uploadingImage!: boolean;
  @Input() updatingPost!: boolean;
  @Input() tags!: Set<string>;

  @Output() submit = new EventEmitter();
  @Output() copyImageLink = new EventEmitter<string>();
  @Output() uploadImage = new EventEmitter<FileList | null>();
  @Output() onTagAdd = new EventEmitter();
  @Output() onTagRemove = new EventEmitter();
  @Output() delete = new EventEmitter();
}
