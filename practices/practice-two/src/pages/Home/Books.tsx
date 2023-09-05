import { MouseEvent, memo } from 'react';

// Hooks
import { useBooks } from 'hooks';

// Components
import { Button, Heading } from 'components/commons';
import { Card, CardSkeleton } from 'components';

// Constants
import { ENDPOINT, MESSAGES } from '@constants';

// Helpers
import { convertDateTimeToTimeString } from 'helpers';

// Styles
import homeStyles from 'pages/Home/index.module.css';

const Books = () => {
  const {
    param: { page: currentPage },
    data: dataShow,
    isLoading,
    pagination,
    deleteBook,
    setSearchParam,
  } = useBooks();

  return (
    <>
      {isLoading ? (
        <div className={homeStyles.grid}>
          {Array.from({ length: 6 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          {dataShow?.length ? (
            <>
              <div className={homeStyles.content}>
                <div className={homeStyles.grid}>
                  {dataShow.map((book) => (
                    <Card
                      href={`/${ENDPOINT.BOOKS}/${book.id}`}
                      title={book.name}
                      description={book.description}
                      publishedDate={convertDateTimeToTimeString(
                        book.createdAt
                      )}
                      imageUrl={book.imageURL}
                      key={book.id}
                      onDelete={(event: MouseEvent) => {
                        event.preventDefault();

                        deleteBook(book.id || 0);
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className={homeStyles.pagination}>
                {pagination.length > 1 &&
                  pagination.map((__, index) => {
                    const page = index + 1;

                    return (
                      <Button
                        label={`${page}`}
                        variant={currentPage === page ? 'primary' : 'secondary'}
                        size="small"
                        key={index}
                        onClick={() => {
                          setSearchParam('page', `${page}`);
                        }}
                      />
                    );
                  })}
              </div>
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
        </>
      )}
    </>
  );
};

export default memo(Books);
