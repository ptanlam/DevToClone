import { User } from './user.model';

export interface Author extends Pick<User, 'id' | 'userName' | 'avatarUrl'> {}
