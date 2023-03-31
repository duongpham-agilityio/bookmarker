import { Book } from 'types';

const title = `HTML/CSS book name will displayed here, test with a
long text, will display full`;

const description = `Will show full description here, with a long text, will limit about 200  character.
Then will display the show more/show less for it. You   with a long text, will limit about 200  character.
Then will display the show more/show less for it. You  with a long text, will limit about 200  character.
Then will display the show more/show less for it. You  with a long text, will limit about 200  character.
Then will display the show more/show less for it. You  with a long text, will limit about 200  character.
Then will display the show more/show less for it. You can see this ex more/show less for it. You can see this ex more/show less for it. You can see this ex You can see this ex You can see this ex more/show less for it. You can see this ex`;

const author = 'Cu.Nguyen';
const imageURL =
  'http://books.google.com/books/content?id=KzzXzqLzXi8C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api';

export const book: Book = {
  name: title,
  author,
  description,
  imageURL,
  id: 0,
  publishDate: new Date().getTime(),
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
  deletedAt: null,
};
