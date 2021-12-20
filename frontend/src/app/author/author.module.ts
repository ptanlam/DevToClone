import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { AuthorRoutingModule } from './author-routing.module';

@NgModule({
  declarations: [AuthorRoutingModule.components],
  imports: [SharedModule, AuthorRoutingModule],
})
export class AuthorModule {}
