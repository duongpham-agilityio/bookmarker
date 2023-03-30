import { Link } from 'react-router-dom';
import useSWR from 'swr';

//Components
import { Button, Input } from 'components/commons';
import { Card } from 'components';

// Types
import { Book } from 'types';

// Styles
import homeStyles from 'pages/Home/index.module.css';
import commonStyles from 'styles/commons/index.module.css';

// Assets
import SearchIcon from 'assets/icons/search.svg';
import AddIcon from 'assets/icons/add.svg';

const Home = () => {
  const { data = [], isLoading, error } = useSWR<Book[]>('books');

  if (error) {
    return <p>{error}</p>;
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
            value={''}
            leftIcon={SearchIcon}
            placeholder="Search something..."
            onChange={() => {}}
          />
          <nav className={homeStyles.navigation}>
            <ul className={homeStyles.navList}>
              <li>
                <Link to="?sort=" className={homeStyles.navLink}>
                  Ascending
                </Link>
              </li>
              <li>
                <Link to="?sort=" className={homeStyles.navLink}>
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
        <div className={homeStyles.content}>
          <div className={homeStyles.grid}>
            {data.map((book) => (
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
          <Button label="1" variant="primary" />
          <Button label="2" variant="secondary" />
          <Button label="3" variant="secondary" />
        </div>
      </section>
    </main>
  );
};

export default Home;
