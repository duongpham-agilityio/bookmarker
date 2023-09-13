import { memo, useCallback, useState } from 'react';

// Hooks
import { useBooks, useDebounce } from 'hooks';

// HOCs
import { withErrorBoundaries } from 'hocs/withErrorBoundaries';

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

// HOCs
import { WithUseFormProps, withUseForm } from 'hocs';

const Home = ({ dispatchAction }: WithUseFormProps) => {
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
  const debounce = useDebounce((value: string) =>
    setSearchParam('name', value)
  );

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
    (value: string) => {
      setSearch(value);
      debounce(value);
    },
    [debounce]
  );

  const createBookHandler = useCallback(() => {
    dispatchAction({
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
  }, [dispatchAction]);

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
          onChangeSearch={changeSearchData}
          onAddBook={createBookHandler}
        />

        {isLoading ? (
          <Pending />
        ) : (
          <Books books={data} onDeleteBook={deleteBook}>
            <Pagination
              onChangePage={changePage}
              currentPage={page}
              pagination={pagination}
            />
          </Books>
        )}
      </section>
    </main>
  );
};

export default memo(withErrorBoundaries(withUseForm(Home)));
