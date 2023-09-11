import { memo } from 'react';

// Components
import { CardSkeleton } from 'components';

// Styles
import homeStyles from 'pages/Home/index.module.css';

const Pending = () => (
  <div className={homeStyles.content}>
    <div className={homeStyles.grid}>
      {Array.from({ length: 6 }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  </div>
);

export default memo(Pending);
