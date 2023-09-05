import { InputHTMLAttributes, MouseEvent, Ref, forwardRef } from 'react';

// Style
import inputStyles from 'components/commons/Input/index.module.css';
import Button from '../Button';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  leftIcon?: string;
  rightIcon?: string;
  className?: string;
  leftIconClick?: (_event: MouseEvent) => void;
  rightIconClick?: (_event: MouseEvent) => void;
};

const InputIcon = ({
  icon,
  ...rest
}: {
  icon?: string;
  onClick?: (_event: MouseEvent) => void;
}) => {
  return (
    <Button
      label=""
      leftIcon={icon}
      style={{
        backgroundColor: 'transparent',
        padding: '0',
        width: 'fit-content',
        height: 'fit-content',
      }}
      {...rest}
    />
  );
};

const Input = (props: InputProps, ref: Ref<HTMLInputElement>) => {
  const {
    leftIcon = '',
    rightIcon = '',
    className = '',
    type = 'text',
    placeholder = 'Enter text...',
    leftIconClick,
    rightIconClick,
    ...rest
  } = props;

  return (
    <div className={`${inputStyles.input} ${className}`}>
      <InputIcon icon={leftIcon} onClick={leftIconClick} />

      <input
        className={inputStyles.value}
        type={type}
        placeholder={placeholder}
        ref={ref}
        {...rest}
      />

      <InputIcon icon={rightIcon} onClick={rightIconClick} />
    </div>
  );
};

export default forwardRef(Input);
