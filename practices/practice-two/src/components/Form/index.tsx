import { MouseEvent, memo, useCallback } from 'react';
import isEqual from 'react-fast-compare';

// Hooks
import { useForm } from 'hooks';

// Components
import { Button, Heading, Input } from 'components/commons';
import BookRecommend from './Recommend';
import ChooseImage from './ChooseImage';

// Types
import { Book } from 'types';

// Styles
import styles from 'components/Form/index.module.css';

export type FormProps = {
  value: Omit<Book, 'publishDate' | 'deletedAt' | 'createdAt' | 'updatedAt'> & {
    publishDate?: number;
  };
  title?: string;
  className?: string;
  type?: 'update' | 'create';
  onClose?: () => void;
};

const Form = (props: FormProps) => {
  const {
    value: data,
    title = 'Create a new book marker',
    className = '',
    type = 'create',
    onClose,
  } = props;
  const {
    value: { author, description, imageURL, name, publishDate, imageName },
    refImage,
    isUpload,
    booksRecommended,
    handleSelectRecommended,
    resetRecommended,
    onChange,
    onSubmit,
  } = useForm(data, type, onClose);

  const chooseImage = useCallback(() => {
    refImage.current?.click();
  }, [refImage]);

  const resetRecommendedData = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();

      resetRecommended([]);
    },
    [resetRecommended]
  );

  return (
    <section className={styles.overlay} onClick={onClose}>
      <form
        className={`${styles.form} ${className}`}
        action="#"
        method="POST"
        onSubmit={onSubmit}
        onClick={resetRecommendedData}
      >
        <Heading label={title} className={styles.heading} />

        <section className={styles.content}>
          <div className={styles.formItem}>
            <div className={styles.formField}>
              <label className={styles.label} htmlFor="bookName">
                Book name
              </label>
              <Input
                value={name}
                placeholder="Book name"
                name="name"
                id="bookName"
                onChange={onChange}
              />

              {!!booksRecommended.length && (
                <BookRecommend
                  books={booksRecommended}
                  onSelect={handleSelectRecommended}
                />
              )}
            </div>
            <div className={styles.formField}>
              <label className={styles.label} htmlFor="author">
                Author
              </label>
              <Input
                value={author}
                placeholder="Author"
                name="author"
                onChange={onChange}
              />
            </div>
          </div>

          <div className={styles.formItem}>
            <div className={styles.formField}>
              <label className={styles.label} htmlFor="publishedDate">
                Published date
              </label>
              <Input
                type="date"
                value={publishDate}
                name="publishDate"
                onChange={onChange}
              />
            </div>
            <div className={`${styles.formField} ${styles.upload}`}>
              <div className={styles.uploadItem}>
                <label className={styles.label} htmlFor="imageURL">
                  Upload
                </label>
                <Input
                  ref={refImage}
                  hidden
                  className={styles.input}
                  type="file"
                  name="imageURL"
                  id="imageURL"
                  accept=".png,.jpeg"
                  onChange={onChange}
                />

                <ChooseImage name={imageName} chooseHandler={chooseImage} />
              </div>
              <div className={styles.uploadItem}>
                {imageURL && (
                  <img
                    src={imageURL}
                    alt="image book"
                    className={styles.image}
                  />
                )}
              </div>
            </div>
          </div>

          <div className={styles.formItem}>
            <div className={styles.formField}>
              <label className={styles.label} htmlFor="bookName">
                Description
              </label>
              <Input
                variant="area"
                className={styles.text}
                value={description}
                placeholder="Book name"
                name="description"
                onChange={onChange}
              />
            </div>
          </div>

          <div className={styles.action}>
            <Button
              label="Cancel"
              width="w-lg"
              border="b-lg"
              onClick={onClose}
            />
            <Button
              disabled={isUpload}
              type="submit"
              label="Save"
              variant={isUpload ? 'default' : 'primary'}
              width="w-lg"
              border="b-lg"
            />
          </div>
        </section>
      </form>
    </section>
  );
};

export default memo(Form, isEqual);
