import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorIntroComponent } from './author-intro';
import { PostDetailsComponent } from './post-details';
import { PostGridComponent } from './post-grid';
import { PostUpdateFormComponent } from './post-update-form';
import { PostUpdateComponent } from './post-update.component';
import { PostComponent } from './post.component';

const routes: Routes = [
  { path: '', component: PostComponent, pathMatch: 'full' },
  { path: 'update', component: PostUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {
  static components = [
    PostComponent,
    PostDetailsComponent,
    PostGridComponent,
    AuthorIntroComponent,
    PostUpdateComponent,
    PostUpdateFormComponent,
  ];
}
