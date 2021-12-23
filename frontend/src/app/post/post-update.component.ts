import { Clipboard } from '@angular/cdk/clipboard';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  NbTagComponent,
  NbTagInputAddEvent,
  NbToastrService,
} from '@nebular/theme';
import { Store } from '@ngrx/store';
import { catchError, of, switchMap, tap, zip } from 'rxjs';
import { selectAuthAccessToken } from '../auth/state';
import { FilesService } from '../core/services';
import { Tag } from '../models';
import { State } from '../state';
import { PostService } from './post.service';

@Component({
  selector: 'fm-post-update',
  template: `
    <fm-post-update-form
      [updateForm]="updateForm"
      [imageUrl]="imageUrl$ | async"
      [uploadingImage]="uploadingImage"
      [updatingPost]="updatingPost"
      [tags]="tags"
      (submit)="submit()"
      (copyImageLink)="copyImageLink($event)"
      (uploadImage)="uploadImage($event)"
      (onTagAdd)="onTagAdd($event)"
      (onTagRemove)="onTagRemove($event)"
      (delete)="delete()"
    ></fm-post-update-form>
  `,
})
export class PostUpdateComponent implements OnInit {
  updateForm: FormGroup;
  imageUrl$ = of('');

  tags = new Set<string>();
  uploadingImage = false;
  updatingPost = false;

  constructor(
    formBuilder: FormBuilder,
    private readonly _postService: PostService,
    private readonly _clipboard: Clipboard,
    private readonly _route: ActivatedRoute,
    private readonly _toastrService: NbToastrService,
    private readonly _filesService: FilesService,
    private readonly _store: Store<State>,
    private readonly _location: Location
  ) {
    this.updateForm = formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
      content: ['', [Validators.required]],
      published: [false],
    });
  }
  ngOnInit(): void {
    this._route.params
      .pipe(
        switchMap(({ id }) =>
          this._postService.loadPostDetails$(id).pipe(
            tap((post) => {
              const { title, content, published } = post;
              this.updateForm.setValue({ title, content, published });
              post.tags.forEach(({ name }) => this.tags.add(name));
            })
          )
        )
      )
      .subscribe();
  }

  submit() {
    if (!this.updateForm.valid) return;

    const { title, content, published } = this.updateForm.value;

    const tags: Pick<Tag, 'name'>[] = [];
    this.tags.forEach((tag) => tags.push({ name: tag }));

    zip(this._route.params, this._store.select(selectAuthAccessToken))
      .pipe(
        switchMap(([{ id }, accessToken]) =>
          this._postService
            .updatePost(id, title, content, published, tags, accessToken)
            .pipe(
              tap(() => {
                this._toastrService.success('Updated post.');
                this._location.back();
              })
            )
        )
      )
      .subscribe();
  }

  uploadImage(fileList: FileList | null) {
    if (!fileList || !fileList.length) return;
    this.imageUrl$ = of(true).pipe(
      tap(() => (this.uploadingImage = true)),
      switchMap(() =>
        this._filesService.upload$(fileList[0]).pipe(
          tap((imageUrl) => {
            this.uploadingImage = false;
            this.updateForm.patchValue({
              content: `${this.updateForm.value['content']} \n\n ${imageUrl}`,
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

  onTagRemove(tagToRemove: NbTagComponent): void {
    this.tags.delete(tagToRemove.text);
  }

  onTagAdd({ value, input }: NbTagInputAddEvent): void {
    if (value) {
      this.tags.add(value);
    }
    input.nativeElement.value = '';
  }

  delete() {
    zip(this._route.params, this._store.select(selectAuthAccessToken))
      .pipe(
        switchMap(([{ id }, accessToken]) =>
          this._postService.deletePost(id, accessToken).pipe(
            tap(() => {
              this._toastrService.success('Deleted post.');
              this._location.back();
            })
          )
        )
      )
      .subscribe();
  }
}
