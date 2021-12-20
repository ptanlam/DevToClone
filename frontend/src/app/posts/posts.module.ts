import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { PostsRoutingModule } from './posts-routing.module';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';
import { PostsService } from './posts.service';

@NgModule({
  declarations: [PostsRoutingModule.components],
  imports: [SharedModule, PostsRoutingModule, LMarkdownEditorModule],
  providers: [PostsService],
})
export class PostsModule {}
