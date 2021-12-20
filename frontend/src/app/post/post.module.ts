import { NgModule } from '@angular/core';
import { MarkdownToHtmlModule } from 'markdown-to-html-pipe';
import { SharedModule } from '../shared';
import { PostRoutingModule } from './post-routing.module';

@NgModule({
  declarations: [PostRoutingModule.components],
  imports: [SharedModule, PostRoutingModule, MarkdownToHtmlModule],
})
export class PostModule {}
