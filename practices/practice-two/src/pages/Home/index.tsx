import { ChangeEvent, useState } from 'react';
import useSWR from 'swr';
import { Link } from 'react-router-dom';
import { useDebounce, useFilter, usePagination, useSearchParam } from 'hooks';

//Components
import { Button, Heading, Input } from 'components/commons';
import { Card, Error } from 'components';

// Constants
import { MESSAGES, SORT } from '@constants';

// Types
import { Book } from 'types';

// Styles
import homeStyles from 'pages/Home/index.module.css';
import commonStyles from 'styles/commons/index.module.css';

// Assets
import SearchIcon from 'assets/icons/search.svg';
import AddIcon from 'assets/icons/add.svg';
import { withErrorBoundary } from 'hocs/withErrorBoudaries';

const Home = () => {
  const { data = [], isLoading, error } = useSWR<Book[]>('books');
  const {
    param: { name, sort },
    setSearchParam,
  } = useSearchParam();
  const { data: filters } = useFilter(data, {
    name,
    sort,
  });
  const {
    data: dataShow,
    pagination,
    currentPage,
    changePageByValue,
  } = usePagination(filters);
  const [search, setSearch] = useState('');
  useDebounce(search, (value) => setSearchParam('name', value));

  if (error) {
    return <Error />;
  }

  if (isLoading) {
    return <p>Loading...</p>;
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
        {dataShow.length ? (
          <>
            <div className={homeStyles.content}>
              <div className={homeStyles.grid}>
                {dataShow.map((book) => (
                  <Card
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
      </section>
    </main>
  );
};

export default withErrorBoundary(Home);
