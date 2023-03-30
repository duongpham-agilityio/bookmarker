import { Link } from 'react-router-dom';

//Components
import { Button, Input } from 'components/commons';

// Styles
import homeStyles from 'pages/Home/index.module.css';
import commonStyles from 'styles/commons/index.module.css';

// Assets
import SearchIcon from 'assets/icons/search.svg';
import AddIcon from 'assets/icons/add.svg';
import { Card } from 'components';

const Home = () => {
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
            {new Array(6).fill(0).map((book, index) => (
              <Card
                title="HTML/CSS Ebook HTML/CSS Ebook HTML/CSS Ebook HTML/CSS Ebook"
                description="Description of some
            book will displayed here Description of some
            book will displayed here Description of some
            book will displayed here"
                publishedDate="9:00 AM"
                imageUrl=""
                key={index}
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
