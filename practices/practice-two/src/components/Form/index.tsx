import { MouseEvent, memo } from 'react';

// Components
import { Button, Heading, Input, TextArea } from 'components/commons';

// Types
import { Book } from 'types';

// Styles
import styles from 'components/Form/index.module.css';

// Assets
import UploadIcon from 'assets/icons/upload.svg';
import { useForm } from 'hooks';

export type FormProps = {
  value: Omit<Book, 'publishDate' | 'deletedAt' | 'createdAt' | 'updatedAt'> & {
    publishDate?: number;
  };
  title?: string;
  className?: string;
  type?: 'update' | 'create';
  onClose?: (_event: MouseEvent) => void;
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
    booksRecommended,
    handleSelectRecommended,
    onChange,
    onSubmit,
  } = useForm(data, type);

  return (
    <section className={styles.overlay}>
      <form
        className={`${styles.form} ${className}`}
        action="#"
        method="POST"
        onSubmit={onSubmit}
      >
        <Heading label={title} className={styles.heading} />

        <div className={styles.content}>
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
                <ul className={styles.recommend}>
                  {booksRecommended.map((book, index) => {
                    return (
                      <li
                        className={styles.recommendItem}
                        key={index}
                        onClick={() => handleSelectRecommended(index)}
                      >
                        <p>{book.name}</p>
                      </li>
                    );
                  })}
                </ul>
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
                <input
                  ref={refImage}
                  hidden
                  className={styles.input}
                  type="file"
                  name="imageURL"
                  id="imageURL"
                  accept=".png,.jpeg"
                  onChange={onChange}
                />
                {!imageName ? (
                  <>
                    <Button
                      label="Upload"
                      width="w-lg"
                      border="b-lg"
                      variant="primary"
                      leftIcon={UploadIcon}
                      onClick={() => {
                        refImage.current?.click();
                      }}
                    />
                  </>
                ) : (
                  <p
                    onClick={() => {
                      refImage.current?.click();
                    }}
                  >
                    {imageName}
                  </p>
                )}
              </div>
              <div className={styles.uploadItem}>
                {imageURL ? (
                  <img
                    src={imageURL}
                    alt="image book"
                    className={styles.image}
                  />
                ) : (
                  <div className={styles.image}>{imageURL}</div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.formItem}>
            <div className={styles.formField}>
              <label className={styles.label} htmlFor="bookName">
                Description
              </label>
              <TextArea
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
              type="submit"
              label="Save"
              variant="primary"
              width="w-lg"
              border="b-lg"
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default memo(Form);
