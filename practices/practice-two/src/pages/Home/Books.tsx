import { MouseEvent, ReactNode, memo, useCallback } from 'react';
import isEqual from 'react-fast-compare';

// Components
import { Heading } from 'components/commons';
import { Card } from 'components';

// Constants
import { ENDPOINT, MESSAGES } from '@constants';

// Helpers
import { convertDateTimeToTimeString } from 'helpers';

// Styles
import homeStyles from 'pages/Home/index.module.css';

// Types
import { Book } from 'types';

export interface BooksProps {
  books: Book[];
  onDeleteBook: (id: number) => void;
  children?: ReactNode;
}

const Books = ({ books, children, onDeleteBook }: BooksProps) => {
  const renderBook = useCallback(
    (book: Book) => {
      const { id, name, description, createdAt, imageURL } = book;
      const deleteHandler = (event: MouseEvent) => {
        event.preventDefault();

        onDeleteBook(id || 0);
      };

      return (
        <Card
          href={`/${ENDPOINT.BOOKS}/${id}`}
          title={name}
          description={description}
          publishedDate={convertDateTimeToTimeString(createdAt)}
          imageUrl={imageURL}
          key={id}
          onDeleteBook={deleteHandler}
        />
      );
    },
    [onDeleteBook]
  );

  return (
    <div className={homeStyles.content}>
      {books.length ? (
        <>
          <div className={homeStyles.grid}>{books.map(renderBook)}</div>
          {children}
        </>
      ) : (
        <div className={homeStyles.empty}>
          <Heading
            label={MESSAGES.EMPTY_TITLE}
            className={homeStyles.emptyTitle}
            size="xl"
          />
          <p className={homeStyles.emptyDescription}>
            {MESSAGES.EMPTY_DESCRIPTION}
          </p>
        </div>
      )}
    </div>
  );
};

const areCompare = (prev: BooksProps, next: BooksProps): boolean =>
  isEqual(prev.books, next.books) && isEqual(prev.children, next.children);

export default memo(Books, areCompare);
