import { ChangeEvent, MouseEvent, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useBooks, useDebounce } from 'hooks';

// HOCS
import { withErrorBoundaries } from 'hocs/withErrorBoundaries';

// Contexts
import { FormContext } from 'contexts/Form/context';

//Components
import { Button, Heading, Input } from 'components/commons';
import { Card, CardSkeleton, Error } from 'components';

// Constants
import { ENDPOINT, MESSAGES, SORT, TITLE_FORM } from '@constants';

// Styles
import homeStyles from 'pages/Home/index.module.css';
import commonStyles from 'styles/commons/index.module.css';

// Assets
import SearchIcon from 'assets/icons/search.svg';
import AddIcon from 'assets/icons/add.svg';

// Helpers
import { convertDateTimeToTimeString } from 'helpers';

const Home = () => {
  const { dispatch } = useContext(FormContext);
  const {
    param: { page: currentPage, sort },
    data: dataShow,
    isLoading,
    error,
    pagination,
    deleteBook,
    setSearchParam,
    convertSearchParamsToString,
  } = useBooks();
  const [search, setSearch] = useState('');
  const debounce = useDebounce((value) => setSearchParam('name', value));

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
              debounce(event.target.value);
            }}
          />
          <nav className={homeStyles.navigation}>
            <ul className={homeStyles.navList}>
              <li>
                <Link
                  to={`/${ENDPOINT.BOOKS}${convertSearchParamsToString(
                    'sort',
                    SORT.ASCENDING
                  )}`}
                  className={`${homeStyles.navLink} ${
                    sort === SORT.ASCENDING ? homeStyles.active : ''
                  }`}
                >
                  Ascending
                </Link>
              </li>
              <li>
                <Link
                  to={`/${ENDPOINT.BOOKS}${convertSearchParamsToString(
                    'sort',
                    SORT.DESCENDING
                  )}`}
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
            onClick={() => {
              dispatch({
                formData: {
                  author: '',
                  description: '',
                  imageURL: '',
                  name: '',
                  createdAt: new Date().getTime(),
                  deletedAt: null,
                  updatedAt: new Date().getTime(),
                },
                title: TITLE_FORM.CREATE,
                type: 'create',
              });
            }}
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
                          variant={
                            currentPage === page ? 'primary' : 'secondary'
                          }
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
      </section>
    </main>
  );
};

export default withErrorBoundaries(Home);
