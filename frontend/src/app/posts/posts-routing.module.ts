import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsCreationFormComponent } from './posts-creation-form';
import { PostsCreationRouteGuard } from './posts-creation-route.guard';
import { PostsCreationComponent } from './posts-creation.component';
import { PostsGridComponent } from './posts-grid';
import { PostsComponent } from './posts.component';

const routes: Routes = [
  { path: '', component: PostsComponent, pathMatch: 'full' },
  {
    path: 'create',
    component: PostsCreationComponent,
    canActivate: [PostsCreationRouteGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {
  static components = [
    PostsComponent,
    PostsGridComponent,
    PostsCreationFormComponent,
    PostsCreationComponent,
  ];
}
