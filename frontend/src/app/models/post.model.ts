import { Author } from './author.model';

export interface Post {
  id: string;
  title: string;
  createdAt: string;
  author: Author;
}
