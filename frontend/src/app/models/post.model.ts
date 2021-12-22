import { Author } from './author.model';
import { Tag } from './tag.model';

export interface Post {
  id: string;
  title: string;
  createdAt: string;
  author: Author;
  tags: Tag[];
}
