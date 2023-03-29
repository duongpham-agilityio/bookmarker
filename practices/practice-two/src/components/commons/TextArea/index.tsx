import { TextareaHTMLAttributes } from 'react';

// Styles
import styles from 'components/commons/TextArea/index.module.css';

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = (props: TextAreaProps) => {
  const { value = '', ...rest } = props;

  return (
    <textarea className={styles.text} {...rest}>
      {value}
    </textarea>
  );
};

export default TextArea;
