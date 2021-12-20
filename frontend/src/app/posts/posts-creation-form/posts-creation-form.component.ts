import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'fm-posts-creation-form',
  templateUrl: './posts-creation-form.component.html',
  styleUrls: ['./posts-creation-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsCreationFormComponent {
  @Input() creationForm!: FormGroup;
  @Input() imageUrl!: string | null;
  @Input() uploadingImage!: boolean;

  @Output() submit = new EventEmitter();
  @Output() copyImageLink = new EventEmitter<string>();
  @Output() uploadImage = new EventEmitter<FileList | null>();
}
