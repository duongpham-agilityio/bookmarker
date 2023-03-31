//Components
import { Button, Heading } from 'components/commons';

// Styles
import skeletonStyles from 'styles/commons/index.module.css';
import styles from 'pages/Detail/Skeleton/index.module.css';

const DetailSkeleton = () => {
  return (
    <section className={`${styles.detail} ${skeletonStyles.loading}`}>
      <div className={styles.detailItem}>
        <Heading
          label={''}
          size="xl"
          className={`${styles.heading} ${skeletonStyles.loadingItem}`}
        />
        <div>
          <div className={styles.action}>
            <Button
              label=""
              className={`${styles.btn} ${skeletonStyles.loadingItem}`}
            />
            <Button
              label=""
              className={`${styles.btn} ${skeletonStyles.loadingItem}`}
            />
            <Button
              label=""
              width="w-lg"
              className={`${styles.btn} ${skeletonStyles.loadingItem}`}
            />
          </div>
        </div>
      </div>
      <div className={styles.detailItem}>
        <div className={styles.info}>
          <p
            className={`${styles.description} ${skeletonStyles.loadingItem}`}
          ></p>
          <ul className={styles.listInfo}>
            <li
              className={`${styles.infoItem} ${skeletonStyles.loadingItem}`}
            ></li>
            <li
              className={`${styles.infoItem} ${skeletonStyles.loadingItem}`}
            ></li>
            <li
              className={`${styles.infoItem} ${skeletonStyles.loadingItem}`}
            ></li>
          </ul>
        </div>
        <div className={styles.imageWrap}>
          <div
            className={`${styles.image} ${skeletonStyles.loadingItem}`}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default DetailSkeleton;
