import { MouseEvent, ChangeEvent, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import isEqual from 'react-fast-compare';

// Component
import { Button, Input } from 'components/commons';

// Styles
import homeStyles from 'pages/Home/index.module.css';

// Assets
import SearchIcon from 'assets/icons/search.svg';
import AddIcon from 'assets/icons/add.svg';

export interface SortOption {
  href: string;
  isActive: boolean;
  title: string;
}

export interface FilterBarProps {
  searchValue: string;
  sortOptions: SortOption[];
  onChangeSearch: (value: string) => void;
  onAddBook: (e: MouseEvent) => void;
}

const FilterBar = ({
  searchValue,
  sortOptions,
  onChangeSearch,
  onAddBook,
}: FilterBarProps) => {
  const changeSearchValue = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChangeSearch(event.target.value);
    },
    [onChangeSearch]
  );

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
        onChange={changeSearchValue}
      />
      <ul className={homeStyles.navList}>{sortOptions.map(renderOption)}</ul>
      <Button
        label="Create"
        variant="primary"
        leftIcon={AddIcon}
        width="w-lg"
        border="b-lg"
        onClick={onAddBook}
      />
    </div>
  );
};

const areCompare = (prev: FilterBarProps, next: FilterBarProps): boolean =>
  isEqual(prev.sortOptions, next.sortOptions) &&
  isEqual(prev.searchValue, next.searchValue);

export default memo(FilterBar, areCompare);
