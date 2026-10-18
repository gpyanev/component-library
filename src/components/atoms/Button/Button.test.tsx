import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from './Button';
import styles from './Button.module.scss';

describe('Button', () => {
  it('renders its label', () => {
    render(<Button label="Click Me" />);
    expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument();
  });

  it('applies the selected variant', () => {
    render(<Button label="Save" variant="outline" />);

    expect(screen.getByRole('button', { name: 'Save' })).toHaveClass(styles.outline);
  });

  it('forwards native button props and a custom class name', () => {
    render(<Button label="Submit" disabled className="custom-button" />);

    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Submit' })).toHaveClass('custom-button');
  });
});
