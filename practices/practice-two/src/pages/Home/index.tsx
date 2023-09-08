import { ChangeEvent, memo, useCallback, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useBooks, useDebounce } from 'hooks';

// HOCs
import { withErrorBoundaries } from 'hocs/withErrorBoundaries';

// Contexts
import { FormContext } from 'contexts/Form/context';

//Components
import { Button, Input } from 'components/commons';
import { Error } from 'components';
import Books from './Books';

// Constants
import { ENDPOINT, SORT, TITLE } from '@constants';

// Styles
import homeStyles from 'pages/Home/index.module.css';
import commonStyles from 'styles/commons/index.module.css';

// Assets
import SearchIcon from 'assets/icons/search.svg';
import AddIcon from 'assets/icons/add.svg';

const Home = () => {
  const { dispatch } = useContext(FormContext);
  const {
    param: { sort },
    error,
    setSearchParam,
    convertSearchParamsToString,
  } = useBooks();
  const [search, setSearch] = useState('');
  const debounce = useDebounce((value) => setSearchParam('name', value));

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
  }, []);

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
            onChange={(
              event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setSearch(event.target.value);
              debounce(event.target.value);
            }}
          />
          <ul className={homeStyles.navList}>
            <li>
              <Link
                to={`/${ENDPOINT.BOOKS}${convertSearchParamsToString(
                  'sort',
                  sort === SORT.ASCENDING ? '' : SORT.ASCENDING
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
                  sort === SORT.DESCENDING ? '' : SORT.DESCENDING
                )}`}
                className={`${homeStyles.navLink} ${
                  sort === SORT.DESCENDING ? homeStyles.active : ''
                }`}
              >
                Descending
              </Link>
            </li>
          </ul>
          <Button
            label="Create"
            variant="primary"
            leftIcon={AddIcon}
            width="w-lg"
            border="b-lg"
            onClick={createBookHandler}
          />
        </div>

        <Books />
      </section>
    </main>
  );
};

export default memo(withErrorBoundaries(Home));
