import { ButtonHTMLAttributes, MouseEvent } from 'react';

// Styles
import buttonStyles from 'components/commons/Button/index.module.css';

type Variant = 'default' | 'primary' | 'secondary' | 'danger';
type Size = 'small' | 'medium' | 'large';
type Border = 'b-md' | 'b-lg';
type Width = 'w-sm' | 'w-lg';
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  leftIcon?: string;
  rightIcon?: string;
  variant?: Variant;
  border?: Border;
  size?: Size;
  width?: Width;
  leftIconClick?: (_e: MouseEvent) => void;
  rightIconClick?: (_e: MouseEvent) => void;
};

const ButtonIcon = ({
  icon,
  ...rest
}: {
  icon?: string;
  onClick?: (_e: MouseEvent) => void;
}) => {
  return (
    <>
      {icon && (
        <img
          src={icon}
          alt="icon action"
          className={buttonStyles.icon}
          {...rest}
        />
      )}
    </>
  );
};

const Button = (props: ButtonProps) => {
  const {
    label,
    leftIcon,
    rightIcon,
    className,
    variant = 'default',
    size = 'medium',
    border = 'b-md',
    width = 'w-sm',
    type = 'button',
    leftIconClick,
    rightIconClick,
    ...rest
  } = props;

  const classes = `${buttonStyles.btn} ${buttonStyles[variant]}
  ${buttonStyles[size]} ${buttonStyles[border]}
  ${buttonStyles[width]} ${className ?? ''}`;

  return (
    <button className={classes} type={type} {...rest}>
      <ButtonIcon icon={leftIcon ?? ''} onClick={leftIconClick} />

      {label}

      <ButtonIcon icon={rightIcon ?? ''} onClick={rightIconClick} />
    </button>
  );
};

export default Button;
