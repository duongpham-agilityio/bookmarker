import {
  InputHTMLAttributes,
  MouseEvent,
  Ref,
  TextareaHTMLAttributes,
  forwardRef,
  memo,
} from 'react';

// Components
import Button from '../Button';

// Style
import inputStyles from 'components/commons/Input/index.module.css';
import textAreaStyle from 'components/commons/Input/textArea.module.css';

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    variant?: 'input' | 'area';
    leftIcon?: string;
    rightIcon?: string;
    customRef?: Ref<HTMLInputElement | HTMLTextAreaElement>;
    leftIconClick?: (_event: MouseEvent) => void;
    rightIconClick?: (_event: MouseEvent) => void;
  };

// const InputIcon = memo(function Icon({
//   icon,
//   ...rest
// }: {
//   icon?: string;
//   onClick?: (_event: MouseEvent) => void;
// }) {
//   return (
//     <Button
//       label=""
//       leftIcon={icon}
//       style={{
//         backgroundColor: 'transparent',
//         padding: '0',
//         width: 'fit-content',
//         height: 'fit-content',
//       }}
//       {...rest}
//       aria-label=""
//     />
//   );
// });

const TextArea = (props: Omit<InputProps, 'variant'>) => {
  const { value = '', className = '', ...rest } = props;

  return (
    <textarea
      className={`${textAreaStyle.text} ${className}`}
      value={value}
      {...rest}
    ></textarea>
  );
};

const Input = (props: Omit<InputProps, 'variant'>) => {
  const {
    leftIcon = '',
    rightIcon = '',
    customRef,
    className = '',
    type = 'text',
    placeholder = 'Enter text...',
    leftIconClick,
    rightIconClick,
    ...rest
  } = props;

  return (
    <div className={`${inputStyles.input} ${className}`}>
      <Button
        label=""
        leftIcon={leftIcon}
        style={{
          backgroundColor: 'transparent',
          padding: '0',
          width: 'fit-content',
          height: 'fit-content',
        }}
        onClick={leftIconClick}
        aria-label="Search button"
      />

      <input
        className={inputStyles.value}
        type={type}
        placeholder={placeholder}
        ref={customRef as Ref<HTMLInputElement>}
        {...rest}
      />

      <Button
        label=""
        leftIcon={rightIcon}
        style={{
          backgroundColor: 'transparent',
          padding: '0',
          width: 'fit-content',
          height: 'fit-content',
        }}
        onClick={rightIconClick}
        aria-label="The right button"
      />
    </div>
  );
};

const Component = (
  { variant, ...rest }: Omit<InputProps, 'customRef'>,
  ref: Ref<HTMLInputElement | HTMLTextAreaElement>
) => {
  const component = {
    input: Input,
    area: TextArea,
  };

  const Render = component[variant ?? 'input'];

  return <Render {...rest} customRef={ref} />;
};

export default memo(forwardRef(Component));
