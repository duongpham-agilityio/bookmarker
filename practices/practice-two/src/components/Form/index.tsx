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
  value: Omit<Book, 'deletedAt' | 'createdAt' | 'updatedAt'>;
  title?: string;
  className?: string;
  onClose?: (_event: MouseEvent) => void;
  handleSubmit?: () => void;
};

const Form = (props: FormProps) => {
  const {
    value: data,
    title = 'Create a new book marker',
    className = '',
    onClose,
    handleSubmit,
  } = props;
  const {
    value: { author, description, imageURL, name, publishDate },
    refImage,
    onChange,
    onSubmit,
  } = useForm(data, handleSubmit);

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
                name="publishedDate"
                onChange={onChange}
              />
            </div>
            <div className={`${styles.formField} ${styles.upload}`}>
              <div className={styles.uploadItem}>
                <label className={styles.label} htmlFor="imageURL">
                  Upload
                </label>
                {!refImage.current?.files?.length ? (
                  <>
                    {/* <Input
                      className={styles.input}
                      type="file"
                      name="imageURL"
                      id="imageURL"
                      accept=".png,.jpeg"
                      onChange={onChange}
                    /> */}
                    <input
                      ref={refImage}
                      hidden
                      className={styles.input}
                      type="file"
                      name="imageURL"
                      id="imageURL"
                      accept=".png,.jpeg"
                    />

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
                  <p>select image</p>
                )}
              </div>
              <div className={styles.uploadItem}>
                {/* <img src={imageURL} alt="image book" className={styles.image} /> */}
                <div className={styles.image}>{imageURL}</div>
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
