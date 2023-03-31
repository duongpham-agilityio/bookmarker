// Components
import { Button, Heading } from 'components/commons';

// Styles
import containerStyles from 'styles/commons/index.module.css';
import styles from 'pages/Detail/index.module.css';

// Assets
import TrashIcon from 'assets/icons/trash.svg';
import BackIcon from 'assets/icons/back.svg';
import PenCilIcon from 'assets/icons/pencil.svg';

const title = `HTML/CSS book name will displayed here, test with a
long text, will display full`;

const description = `Will show full description here, with a long text, will limit about 200  character.
Then will display the show more/show less for it. You   with a long text, will limit about 200  character.
Then will display the show more/show less for it. You  with a long text, will limit about 200  character.
Then will display the show more/show less for it. You  with a long text, will limit about 200  character.
Then will display the show more/show less for it. You  with a long text, will limit about 200  character.
Then will display the show more/show less for it. You can see this ex more/show less for it. You can see this ex more/show less for it. You can see this ex You can see this ex You can see this ex more/show less for it. You can see this ex`;

const author = 'Cu.Nguyen';
const publishedDate = '9:54 AM, 03/27/2023';
const createdAt = '9:54 AM, 03/27/2023';
const updatedAt = '9:54 AM, 03/27/2023';
const imageURL =
  'http://books.google.com/books/content?id=KzzXzqLzXi8C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api';

const Detail = () => {
  return (
    <main className={containerStyles.container}>
      <section className={styles.detail}>
        <div className={styles.detailItem}>
          <Heading label={title} size="xl" className={styles.heading} />
          <div>
            <div className={styles.action}>
              <Button label="" leftIcon={TrashIcon} variant="danger" />
              <Button label="" leftIcon={BackIcon} variant="primary" />
              <Button
                label="Edit"
                leftIcon={PenCilIcon}
                variant="primary"
                width="w-lg"
              />
            </div>
          </div>
        </div>
        <div className={styles.detailItem}>
          <div className={styles.info}>
            <p className={styles.description}>
              <span>{description.substring(0, 150)}</span>
              <span className={styles.actionText}>show more</span>
            </p>
            <ul className={styles.listInfo}>
              <li className={styles.infoItem}>
                <span className={styles.label}>Author: </span>
                <span className={styles.text}>{author}</span>
              </li>
              <li className={styles.infoItem}>
                <span className={styles.label}>Published date: </span>
                <span className={styles.text}>{publishedDate}</span>
              </li>
              <li className={styles.infoItem}>
                <span className={styles.label}>Created at: </span>
                <span className={styles.text}>{createdAt}</span>
              </li>
              <li className={styles.infoItem}>
                <span className={styles.label}>Updated at: </span>
                <span className={styles.text}>{updatedAt}</span>
              </li>
            </ul>
          </div>
          <div className={styles.imageWrap}>
            <img src={imageURL} alt={title} className={styles.image} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Detail;
