import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  NbButtonGroupModule,
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbPopoverModule,
  NbSpinnerModule,
  NbToggleModule,
  NbUserModule,
  NbTagModule,
} from '@nebular/theme';
import { FitImageTagPipe } from './pipes';
import { PostsCardComponent } from './posts-card';
import { TagListComponent } from './tag-list';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NbCardModule,
    NbTagModule,
    FlexLayoutModule,
  ],
  declarations: [FitImageTagPipe, PostsCardComponent, TagListComponent],
  exports: [
    NbLayoutModule,
    NbButtonModule,
    NbButtonGroupModule,
    NbCardModule,
    NbInputModule,
    NbSpinnerModule,
    NbInputModule,
    NbUserModule,
    NbIconModule,
    NbToggleModule,
    NbPopoverModule,
    NbContextMenuModule,
    NbFormFieldModule,
    NbListModule,
    NbTagModule,

    RouterModule,
    CommonModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,

    FitImageTagPipe,

    PostsCardComponent,
    TagListComponent,
  ],
})
export class SharedModule {}
