import { MouseEvent, memo } from 'react';
import { Link, LinkProps } from 'react-router-dom';

// Component
import { Button, Heading } from 'components/commons';

// Styles
import styles from 'components/Card/index.module.css';

// Assets
import NextIcon from 'assets/icons/next.svg';
import TrashIcon from 'assets/icons/trash.svg';

export type CardProps = Omit<LinkProps, 'to'> & {
  href?: string;
  title: string;
  description: string;
  publishedDate: string;
  imageUrl: string;
  onDeleteBook?: (_event: MouseEvent) => void;
};

const Card = (props: CardProps) => {
  const {
    title,
    description,
    publishedDate,
    imageUrl,
    href = '',
    onDeleteBook,
  } = props;

  return (
    <Link to={href} className={styles.card}>
      <div className={styles.cardItem}>
        <Heading label={title} className={styles.heading} />
        <p className={styles.description}>{description}</p>
        <div className={styles.action}>
          <Button leftIcon={NextIcon} label="" variant="primary" />
          <Button
            leftIcon={TrashIcon}
            label=""
            variant="danger"
            onClick={onDeleteBook}
          />
        </div>
      </div>
      <div className={styles.cardItem}>
        <p className={styles.time}>{publishedDate}</p>
        {imageUrl ? (
          <img src={imageUrl} alt={title} className={styles.image} />
        ) : (
          <div className={`${styles.image} ${styles.fake}`}></div>
        )}
      </div>
    </Link>
  );
};

export default memo(Card);
