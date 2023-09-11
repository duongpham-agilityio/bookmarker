import { ButtonHTMLAttributes, memo } from 'react';

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
};

const Icon = ({
  icon,
  subTitle = 'icon action',
  ...rest
}: {
  icon?: string;
  subTitle?: string;
}) =>
  icon && (
    <img src={icon} alt={subTitle} className={buttonStyles.icon} {...rest} />
  );

const ButtonIcon = memo(Icon);

const Button = (props: ButtonProps) => {
  const {
    label,
    leftIcon = '',
    rightIcon = '',
    className = '',
    variant = 'default',
    size = 'medium',
    border = 'b-md',
    width = 'w-sm',
    type = 'button',
    ...rest
  } = props;

  const classes = `${buttonStyles.btn} ${buttonStyles[variant]}
  ${buttonStyles[size]} ${buttonStyles[border]}
  ${buttonStyles[width]} ${className}`;

  return (
    <button className={classes} type={type} {...rest}>
      <ButtonIcon
        icon={leftIcon}
        subTitle="This is the left icon for the button"
      />

      {label}

      <ButtonIcon
        icon={rightIcon}
        subTitle="This is the right icon for the button"
      />
    </button>
  );
};

export default memo(Button);
