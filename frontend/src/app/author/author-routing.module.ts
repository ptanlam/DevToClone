import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorBannerComponent } from './author-banner';
import { AuthorGridComponent } from './author-grid';
import { AuthorComponent } from './author.component';

const routes: Routes = [{ path: '', component: AuthorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorRoutingModule {
  static components = [
    AuthorComponent,
    AuthorGridComponent,
    AuthorBannerComponent,
  ];
}
