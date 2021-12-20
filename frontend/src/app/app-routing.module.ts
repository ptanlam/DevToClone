import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule, AuthRouteGuard } from './auth';

const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' },

  {
    path: 'posts',
    loadChildren: () => import('./posts').then((m) => m.PostsModule),
  },

  {
    path: 'posts/:id',
    loadChildren: () => import('./post').then((m) => m.PostModule),
  },

  {
    path: 'authors/:id',
    loadChildren: () => import('./author').then((m) => m.AuthorModule),
  },

  {
    path: 'auth',
    loadChildren: () => AuthModule,
    canActivate: [AuthRouteGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
