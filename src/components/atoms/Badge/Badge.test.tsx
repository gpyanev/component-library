import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Badge } from './Badge';
import styles from './Badge.module.scss';

describe('Badge', () => {
  it('renders its children', () => {
    render(<Badge>New</Badge>);

    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('applies the selected variant and size', () => {
    render(
      <Badge variant="success" size="sm">
        Complete
      </Badge>
    );

    expect(screen.getByText('Complete')).toHaveClass(styles.success, styles.sm);
  });

  it('forwards native span attributes and the class name', () => {
    render(
      <Badge aria-label="Current status" className="custom-badge">
        Ready
      </Badge>
    );

    const badge = screen.getByLabelText('Current status');
    expect(badge).toHaveClass(styles.badge, 'custom-badge');
  });
});
