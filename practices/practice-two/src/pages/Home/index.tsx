import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useBooks, useDebounce } from 'hooks';

//Components
import { Button, Heading, Input } from 'components/commons';
import { Card, CardSkeleton, Error } from 'components';

// Constants
import { MESSAGES, SORT } from '@constants';

// Styles
import homeStyles from 'pages/Home/index.module.css';
import commonStyles from 'styles/commons/index.module.css';

// Assets
import SearchIcon from 'assets/icons/search.svg';
import AddIcon from 'assets/icons/add.svg';
import { withErrorBoundary } from 'hocs/withErrorBoudaries';

const Home = () => {
  const {
    param: { page: currentPage, sort },
    data: dataShow,
    isLoading,
    error,
    pagination,
    changePageByValue,
    setSearchParam,
  } = useBooks();
  const [search, setSearch] = useState('');
  useDebounce(search, (value) => setSearchParam('name', value));

  if (error) {
    return <Error />;
  }

  return (
    <main className={commonStyles.container}>
      <section className={homeStyles.home}>
        <div className={homeStyles.navbar}>
          <Input
            className={homeStyles.search}
            value={search}
            leftIcon={SearchIcon}
            placeholder="Search something..."
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setSearch(event.target.value);
            }}
          />
          <nav className={homeStyles.navigation}>
            <ul className={homeStyles.navList}>
              <li>
                <Link
                  to={`?sort=${SORT.ASCENDING}`}
                  className={`${homeStyles.navLink} ${
                    sort === SORT.ASCENDING ? homeStyles.active : ''
                  }`}
                >
                  Ascending
                </Link>
              </li>
              <li>
                <Link
                  to={`?sort=${SORT.DESCENDING}`}
                  className={`${homeStyles.navLink} ${
                    sort === SORT.DESCENDING ? homeStyles.active : ''
                  }`}
                >
                  Descending
                </Link>
              </li>
            </ul>
          </nav>
          <Button
            label="Create"
            variant="primary"
            leftIcon={AddIcon}
            width="w-lg"
            border="b-lg"
          />
        </div>

        {isLoading ? (
          <div className={homeStyles.grid}>
            {[1, 2, 3, 4, 5, 6].map((value) => (
              <CardSkeleton key={value} />
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
                        href={`${book.id}`}
                        title={book.name}
                        description={book.description}
                        publishedDate="9:00 AM"
                        imageUrl={book.imageURL}
                        key={book.id}
                      />
                    ))}
                  </div>
                </div>
                <div className={homeStyles.pagination}>
                  {pagination.map((__, index) => {
                    const page = index + 1;

                    return (
                      <Button
                        label={`${page}`}
                        variant={currentPage === page ? 'primary' : 'secondary'}
                        key={index}
                        onClick={() => {
                          changePageByValue(page);
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
      </section>
    </main>
  );
};

export default withErrorBoundary(Home);
