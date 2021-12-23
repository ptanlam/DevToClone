import { NgModule } from '@angular/core';
import { MarkdownToHtmlModule } from 'markdown-to-html-pipe';
import { SharedModule } from '../shared';
import { PostRoutingModule } from './post-routing.module';
import { PostService } from './post.service';

@NgModule({
  declarations: [PostRoutingModule.components],
  imports: [SharedModule, PostRoutingModule, MarkdownToHtmlModule],
  providers: [PostService],
})
export class PostModule {}
