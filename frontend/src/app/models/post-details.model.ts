import { Post } from './post.model';

export interface PostDetails extends Post {
  content: string;
}
