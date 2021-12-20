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
} from '@nebular/theme';
import { FitImageTagPipe } from './pipes';
import { PostsCardComponent } from './posts-card';

@NgModule({
  imports: [CommonModule, RouterModule, NbCardModule, FlexLayoutModule],
  declarations: [FitImageTagPipe, PostsCardComponent],
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

    RouterModule,
    CommonModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,

    FitImageTagPipe,

    PostsCardComponent,
  ],
})
export class SharedModule {}
