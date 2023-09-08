import { memo } from 'react';
import isEqual from 'react-fast-compare';

// Components
import { Button } from 'components/commons';

// Styles
import homeStyles from 'pages/Home/index.module.css';

interface PaginationProps {
  currentPage: number;
  pagination: number[];
  changePage: (page: number) => void;
}

const Pagination = ({
  pagination,
  currentPage,
  changePage,
}: PaginationProps) => {
  return (
    <div className={homeStyles.pagination}>
      {(pagination ?? []).map((_, index) => {
        const page = index + 1;
        const handleChangePage = () => {
          changePage(page);
        };

        return (
          <Button
            label={`${page}`}
            variant={currentPage === page ? 'primary' : 'secondary'}
            size="small"
            key={index}
            onClick={handleChangePage}
          />
        );
      })}
    </div>
  );
};

export default memo(Pagination, isEqual);
