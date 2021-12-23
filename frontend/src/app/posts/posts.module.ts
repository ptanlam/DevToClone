import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsService } from './posts.service';

@NgModule({
  declarations: [PostsRoutingModule.components],
  imports: [SharedModule, PostsRoutingModule],
  providers: [PostsService],
})
export class PostsModule {}
