import { MouseEvent, ChangeEvent, memo } from 'react';
import { Link } from 'react-router-dom';
import isEqual from 'react-fast-compare';

// Component
import { Button, Input } from 'components/commons';

// Styles
import homeStyles from 'pages/Home/index.module.css';

// Assets
import SearchIcon from 'assets/icons/search.svg';
import AddIcon from 'assets/icons/add.svg';
import { useCallback } from 'react';

export interface SortOption {
  href: string;
  isActive: boolean;
  title: string;
}

interface FilterBarProps {
  searchValue: string;
  sortOptions: SortOption[];
  changeSearchData: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  addBook: (e: MouseEvent) => void;
}

const FilterBar = ({
  searchValue,
  sortOptions,
  changeSearchData,
  addBook,
}: FilterBarProps) => {
  const renderOption = useCallback((option: SortOption) => {
    const { href, title, isActive } = option;

    return (
      <li key={title}>
        <Link
          to={href}
          className={`${homeStyles.navLink} ${
            isActive ? homeStyles.active : ''
          }`}
        >
          {title}
        </Link>
      </li>
    );
  }, []);

  return (
    <div className={homeStyles.navbar}>
      <Input
        className={homeStyles.search}
        value={searchValue}
        leftIcon={SearchIcon}
        placeholder="Search something..."
        onChange={changeSearchData}
      />
      <ul className={homeStyles.navList}>
        {(sortOptions ?? []).map(renderOption)}
      </ul>
      <Button
        label="Create"
        variant="primary"
        leftIcon={AddIcon}
        width="w-lg"
        border="b-lg"
        onClick={addBook}
      />
    </div>
  );
};

export default memo(FilterBar, isEqual);
