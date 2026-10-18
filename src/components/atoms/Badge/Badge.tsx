import type { ComponentProps } from 'react';
import styles from './Badge.module.scss';

export interface BadgeProps extends ComponentProps<'span'> {
  variant?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
}

export const Badge = ({
  children,
  className,
  ref,
  size = 'md',
  variant = 'neutral',
  ...rest
}: BadgeProps) => {
  const classes = [styles.badge, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(' ');

  return (
    <span ref={ref} className={classes} {...rest}>
      {children}
    </span>
  );
};
