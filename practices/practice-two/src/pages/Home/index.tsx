import { ChangeEvent, memo, useCallback, useContext, useState } from 'react';

// Hooks
import { useBooks, useDebounce } from 'hooks';

// HOCs
import { withErrorBoundaries } from 'hocs/withErrorBoundaries';

// Contexts
import { FormContext } from 'contexts/Form/context';

//Components
import { Error } from 'components';
import Books from './Books';
import Pagination from './Pagination';
import Pending from './Pending';
import FilterBar, { SortOption } from './FilterBar';

// Constants
import { ENDPOINT, SORT, TITLE } from '@constants';

// Styles
import homeStyles from 'pages/Home/index.module.css';
import commonStyles from 'styles/commons/index.module.css';

const Home = () => {
  const { dispatch } = useContext(FormContext);
  const {
    isLoading,
    param: { sort, page },
    error,
    pagination,
    data,
    setSearchParam,
    convertSearchParamsToString,
    deleteBook,
  } = useBooks();
  const [search, setSearch] = useState('');
  const debounce = useDebounce((value) => setSearchParam('name', value));

  const sortOptions: SortOption[] = [
    {
      href: `/${ENDPOINT.BOOKS}${convertSearchParamsToString(
        'sort',
        sort === SORT.ASCENDING ? '' : SORT.ASCENDING
      )}`,
      isActive: sort === SORT.ASCENDING,
      title: 'Ascending',
    },
    {
      href: `/${ENDPOINT.BOOKS}${convertSearchParamsToString(
        'sort',
        sort === SORT.DESCENDING ? '' : SORT.DESCENDING
      )}`,
      isActive: sort === SORT.DESCENDING,
      title: 'Descending',
    },
  ];

  const changeSearchData = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSearch(event.target.value);
      debounce(event.target.value);
    },
    [debounce]
  );

  const createBookHandler = useCallback(() => {
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
      title: TITLE.FORM_CREATE,
      type: 'create',
    });
  }, [dispatch]);

  const changePage = useCallback(
    (page: number) => {
      setSearchParam('page', `${page}`);
    },
    [setSearchParam]
  );

  if (error) {
    return <Error />;
  }

  return (
    <main className={commonStyles.container}>
      <section className={homeStyles.home}>
        <FilterBar
          searchValue={search}
          sortOptions={sortOptions}
          changeSearchData={changeSearchData}
          addBook={createBookHandler}
        />

        {isLoading ? (
          <Pending />
        ) : (
          <Books books={data} deleteBook={deleteBook}>
            <Pagination
              changePage={changePage}
              currentPage={page}
              pagination={pagination}
            />
          </Books>
        )}
      </section>
    </main>
  );
};

export default memo(withErrorBoundaries(Home));
