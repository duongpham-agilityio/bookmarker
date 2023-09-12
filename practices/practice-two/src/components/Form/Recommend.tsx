import { memo, useCallback } from 'react';

// Styles
import styles from 'components/Form/index.module.css';

// Types
import { Recommend } from 'types';

export interface RecommendProps {
  books: Recommend[];
  onSelect: (index: number) => void;
}

const BookRecommend = ({ books, onSelect }: RecommendProps) => {
  const renderBook = useCallback(
    (book: Recommend, index: number) => {
      const { name } = book;
      const handleSelectBook = () => onSelect(index);

      return (
        <li
          className={styles.recommendItem}
          key={index}
          onClick={handleSelectBook}
        >
          <p>{name}</p>
        </li>
      );
    },
    [onSelect]
  );

  return <ul className={styles.recommend}>{books.map(renderBook)}</ul>;
};
export default memo(BookRecommend);
