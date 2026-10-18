import type { ComponentProps } from 'react';
import styles from './Button.module.scss';

export interface ButtonProps extends ComponentProps<'button'> {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Button = ({ label, variant = 'primary', className, ref, ...rest }: ButtonProps) => {
  return (
    <button
      ref={ref}
      className={[styles.button, styles[variant], className].filter(Boolean).join(' ')}
      {...rest}
    >
      {label}
    </button>
  );
};
