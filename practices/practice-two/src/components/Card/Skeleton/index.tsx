// Components
import { Button, Heading } from 'components/commons';

// Styles
import styles from 'components/Card/Skeleton/index.module.css';
import skeletonStyles from 'styles/commons/index.module.css';

const CardSkeleton = () => {
  return (
    <div
      className={`${styles.card} ${skeletonStyles.loading}`}
      data-testid="card-skeleton"
    >
      <div className={styles.cardItem}>
        <Heading
          label=""
          className={`${styles.heading} ${skeletonStyles.loadingItem}`}
        />
        <p
          className={`${styles.description} ${skeletonStyles.loadingItem}`}
        ></p>
        <div className={styles.action}>
          <Button
            // leftIcon={NextIcon}
            label=""
            variant="primary"
            className={skeletonStyles.loadingItem}
          />
          <Button
            // leftIcon={TrashIcon}
            label=""
            variant="danger"
            className={skeletonStyles.loadingItem}
          />
        </div>
      </div>
      <div className={styles.cardItem}>
        <p className={`${styles.time} ${skeletonStyles.loadingItem}`}></p>
        <div
          className={`${styles.image} ${styles.fake} ${skeletonStyles.loadingItem}`}
        ></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
