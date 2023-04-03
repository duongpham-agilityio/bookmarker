import { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBook } from 'hooks';

// HOCs
import { withErrorBoundaries } from 'hocs/withErrorBoundaries';

// Contexts
import { FormContext } from 'contexts/Form/context';

// Components
import { Button, Heading } from 'components/commons';
import { Error } from 'components';
import DetailSkeleton from 'pages/Detail/Skeleton';

// Styles
import containerStyles from 'styles/commons/index.module.css';
import styles from 'pages/Detail/index.module.css';

// Assets
import TrashIcon from 'assets/icons/trash.svg';
import BackIcon from 'assets/icons/back.svg';
import PenCilIcon from 'assets/icons/pencil.svg';
import { convertDateTimeToTimeString, convertTimeToDate } from 'helpers';

const Detail = () => {
  const { data, error, isLoading, deleteBook } = useBook();
  const redirect = useNavigate();

  if (error) {
    return <Error />;
  }

  const { dispatch } = useContext(FormContext);
  const book = useMemo(() => {
    const { publishDate, createdAt, updatedAt, ...rest } = data;
    const publishDateConvert = `${convertDateTimeToTimeString(
      publishDate
    )}, ${convertTimeToDate(publishDate, '/', true)}`;
    const createdAtConvert = `${convertDateTimeToTimeString(
      createdAt
    )}, ${convertTimeToDate(createdAt, '/', true)}`;
    const updatedAtConvert = `${convertDateTimeToTimeString(
      updatedAt
    )}, ${convertTimeToDate(updatedAt, '/', true)}`;

    return {
      ...rest,
      publishDate: publishDateConvert,
      createdAt: createdAtConvert,
      updatedAt: updatedAtConvert,
    };
  }, [data]);

  return (
    <main className={containerStyles.container}>
      {isLoading ? (
        <DetailSkeleton />
      ) : (
        <section className={styles.detail}>
          <div className={styles.detailItem}>
            <Heading label={data.name} size="xl" className={styles.heading} />
            <div>
              <div className={styles.action}>
                <Button
                  label=""
                  leftIcon={TrashIcon}
                  variant="danger"
                  onClick={deleteBook}
                />
                <Button
                  label=""
                  leftIcon={BackIcon}
                  variant="primary"
                  onClick={() => redirect('/books')}
                />
                <Button
                  label="Edit"
                  leftIcon={PenCilIcon}
                  variant="primary"
                  width="w-lg"
                  onClick={() =>
                    dispatch({
                      formData: data,
                      title: 'Edit book',
                      type: 'update',
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.info}>
              <p className={styles.description}>
                <span>{data.description.substring(0, 150)}</span>
                <span className={styles.actionText}>show more</span>
              </p>
              <ul className={styles.listInfo}>
                <li className={styles.infoItem}>
                  <span className={styles.label}>Author: </span>
                  <span className={styles.text}>{book.author}</span>
                </li>
                <li className={styles.infoItem}>
                  <span className={styles.label}>Published date: </span>
                  <span className={styles.text}>{book.publishDate}</span>
                </li>
                <li className={styles.infoItem}>
                  <span className={styles.label}>Created at: </span>
                  <span className={styles.text}>{book.createdAt}</span>
                </li>
                <li className={styles.infoItem}>
                  <span className={styles.label}>Updated at: </span>
                  <span className={styles.text}>{book.updatedAt}</span>
                </li>
              </ul>
            </div>
            <div className={styles.imageWrap}>
              <img
                src={data.imageURL}
                alt={data.name}
                className={styles.image}
              />
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default withErrorBoundaries(Detail);
