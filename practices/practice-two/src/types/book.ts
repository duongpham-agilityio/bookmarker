export type Book = {
  id?: number;
  name: string;
  author: string;
  imageURL: string;
  description: string;
  publishDate: number;
  createdAt: number;
  updatedAt: number;
  deletedAt: number | null;
};
