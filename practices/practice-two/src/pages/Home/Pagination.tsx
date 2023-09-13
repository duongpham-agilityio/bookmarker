import { memo } from 'react';
import isEqual from 'react-fast-compare';

// Components
import { Button } from 'components/commons';

// Styles
import homeStyles from 'pages/Home/index.module.css';

export interface PaginationProps {
  currentPage: number;
  pagination: number[];
  onChangePage: (page: number) => void;
}

const Pagination = ({
  pagination,
  currentPage,
  onChangePage,
}: PaginationProps) => {
  return (
    <div className={homeStyles.pagination}>
      {pagination.map((_, index) => {
        const page = index + 1;
        const handleChangePage = () => {
          onChangePage(page);
        };

        return (
          <Button
            label={`${page}`}
            variant={currentPage === page ? 'primary' : 'secondary'}
            size="small"
            key={index}
            onClick={handleChangePage}
            data-testid="pagination"
          />
        );
      })}
    </div>
  );
};

const areCompare = (prev: PaginationProps, next: PaginationProps): boolean =>
  isEqual(prev.currentPage, next.currentPage) &&
  isEqual(prev.pagination, next.pagination);

export default memo(Pagination, areCompare);
