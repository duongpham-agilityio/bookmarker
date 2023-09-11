import { MouseEvent, ReactNode, memo, useCallback } from 'react';

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

interface BooksProps {
  books: Book[];
  deleteBook: (id: number) => void;
  children?: ReactNode;
}

const Books = ({ books, children, deleteBook }: BooksProps) => {
  const renderBook = useCallback(
    (book: Book) => {
      const deleteHandler = (event: MouseEvent) => {
        event.preventDefault();

        deleteBook(book.id || 0);
      };

      return (
        <Card
          href={`/${ENDPOINT.BOOKS}/${book.id}`}
          title={book.name}
          description={book.description}
          publishedDate={convertDateTimeToTimeString(book.createdAt)}
          imageUrl={book.imageURL}
          key={book.id}
          onDelete={deleteHandler}
        />
      );
    },
    [deleteBook]
  );

  return (
    <div className={homeStyles.content}>
      {(books ?? []).length ? (
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

export default memo(Books);
