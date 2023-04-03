import { Book } from './book';

export type Recommend = Omit<
  Book,
  'publishDate' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'author' | 'id'
>;
