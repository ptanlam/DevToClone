import { Clipboard } from '@angular/cdk/clipboard';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  NbTagComponent,
  NbTagInputAddEvent,
  NbToastrService,
} from '@nebular/theme';
import { Store } from '@ngrx/store';
import { catchError, of, switchMap, tap, zip } from 'rxjs';
import {
  selectAuthAccessToken,
  selectAuthStatus,
  selectAuthUser,
} from '../auth/state';
import { FilesService } from '../core/services';
import { Tag, User } from '../models';
import { State } from '../state';
import { PostsService } from './posts.service';

@Component({
  selector: 'fm-posts-creation',
  template: `
    <fm-posts-creation-form
      [creationForm]="creationForm"
      [imageUrl]="imageUrl$ | async"
      [uploadingImage]="uploadingImage"
      [creatingPost]="creatingPost"
      [tags]="tags"
      (submit)="submit()"
      (uploadImage)="uploadImage($event)"
      (copyImageLink)="copyImageLink($event)"
      (onTagAdd)="onTagAdd($event)"
      (onTagRemove)="onTagRemove($event)"
    ></fm-posts-creation-form>
  `,
  styles: [],
})
export class PostsCreationComponent {
  creationForm: FormGroup;
  imageUrl$ = of('');

  tags = new Set<string>();
  uploadingImage = false;
  creatingPost = false;

  private readonly _isAuthenticated = this._store.select(selectAuthStatus);
  private readonly _accessToken = this._store.select(selectAuthAccessToken);
  private readonly _user = this._store.select(selectAuthUser);

  isAuthenticated!: string;
  accessToken!: string;
  user!: User;

  constructor(
    formBuilder: FormBuilder,
    private readonly _postsService: PostsService,
    private readonly _filesService: FilesService,
    private readonly _toastrService: NbToastrService,
    private readonly _clipboard: Clipboard,
    private readonly _router: Router,
    private readonly _store: Store<State>
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

  onTagRemove(tagToRemove: NbTagComponent): void {
    this.tags.delete(tagToRemove.text);
  }

  onTagAdd({ value, input }: NbTagInputAddEvent): void {
    if (value) {
      this.tags.add(value);
    }
    input.nativeElement.value = '';
  }

  submit() {
    const { title, content, published } = this.creationForm.value;

    const tags: Pick<Tag, 'name'>[] = [];
    this.tags.forEach((tag) => tags.push({ name: tag }));

    zip(
      this._isAuthenticated,
      this._accessToken,
      this._user,
      of({ title, content, published, tags })
    ).subscribe({
      next: ([
        isAuthenticated,
        accessToken,
        user,
        { title, content, published, tags },
      ]) => {
        if (!isAuthenticated) return;
        this._postsService
          .createNew(title, content, published, accessToken, user.id, tags)
          .subscribe({
            next: () => {
              this.creatingPost = false;
              this._router.navigate(['/posts']);
              this._toastrService.success('Your post has been created.');
            },
          });
      },
    });
  }

  uploadImage(fileList: FileList | null) {
    if (!fileList || !fileList.length) return;
    this.imageUrl$ = of(true).pipe(
      tap(() => (this.uploadingImage = true)),
      switchMap(() =>
        this._filesService.upload$(fileList[0]).pipe(
          tap((imageUrl) => {
            this.uploadingImage = false;
            this.creationForm.patchValue({
              content: `${this.creationForm.value['content']} \n\n ${imageUrl}`,
            });
          }),
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
