// Component
import { Heading } from 'components/commons';

// Constants
import { MESSAGES } from '@constants';

// Styles
import styles from 'components/Error/index.module.css';

export interface ErrorProps {
  title?: string;
  description?: string;
}

const Error = ({
  title = MESSAGES.ERROR_TITLE,
  description = MESSAGES.ERROR_DESCRIPTION,
}: ErrorProps) => (
  <section className={styles.empty}>
    <Heading label={title} className={styles.emptyTitle} size="sm" />
    <p className={styles.emptyDescription}>{description}</p>
  </section>
);

export default Error;
