import { Clipboard } from '@angular/cdk/clipboard';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { catchError, of, switchMap, tap } from 'rxjs';
import { FilesService } from '../core/services';
import { PostsService } from './posts.service';

@Component({
  selector: 'fm-posts-creation',
  template: `
    <fm-posts-creation-form
      [creationForm]="creationForm"
      [imageUrl]="imageUrl$ | async"
      [uploadingImage]="uploadingImage"
      (submit)="submit()"
      (uploadImage)="uploadImage($event)"
      (copyImageLink)="copyImageLink($event)"
    ></fm-posts-creation-form>
  `,
  styles: [],
})
export class PostsCreationComponent {
  creationForm: FormGroup;
  uploadingImage = false;
  imageUrl$ = of('');

  constructor(
    formBuilder: FormBuilder,
    private readonly _postsService: PostsService,
    private readonly _filesService: FilesService,
    private readonly _toastrService: NbToastrService,
    private readonly _clipboard: Clipboard,
    private readonly _router: Router
  ) {
    this.creationForm = formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
      content: ['# Hello world', [Validators.required]],
      published: [false],
    });
  }

  submit() {
    const { title, content, published } = this.creationForm.value;
    this._postsService
      .createNew$(title, content, published)
      .subscribe({ next: () => this._router.navigate(['/posts']) });
  }

  uploadImage(fileList: FileList | null) {
    if (!fileList || !fileList.length) return;
    this.imageUrl$ = of(true).pipe(
      tap(() => (this.uploadingImage = true)),
      switchMap(() =>
        this._filesService.upload$(fileList[0]).pipe(
          tap(() => (this.uploadingImage = false)),
          catchError((error) =>
            of(error).pipe(
              tap(() => {
                this.uploadingImage = false;
                this._toastrService.danger(
                  'Error occurred while attempting to upload your image.'
                );
              })
            )
          )
        )
      )
    );
  }

  copyImageLink(url: string) {
    this._clipboard.copy(url);
  }
}
