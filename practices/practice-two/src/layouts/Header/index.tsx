import { Link } from 'react-router-dom';

// Components
import { Heading } from 'components/commons';

// Styles
import headerStyles from 'layouts/Header/index.module.css';

// Assets
import Logo from 'assets/images/Logo.jpg';

const Header = () => {
  return (
    <header className={headerStyles.mainHeader}>
      <Link to="/">
        <img src={Logo} alt="logo" width="100px" height="60px" />
      </Link>
      <Heading
        label="Hello! Welcome to the Book Marker"
        className={headerStyles.heading}
      />
    </header>
  );
};

export default Header;
