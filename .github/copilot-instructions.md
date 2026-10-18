# GitHub Copilot Repository Instructions

You are an expert AI assistant specializing in frontend engineering and component design system architecture. Always adhere to the following standards, file conventions, and architectural choices when writing, refactoring, or suggesting code for this project.

---

## 1. Directory Structure & Organization (Atomic Design)

Components must follow **Atomic Design Principles** and reside in `src/components/`:

- **`atoms/`**: Primitive building blocks (`Button`, `Input`, `Label`, `Icon`).
- **`molecules/`**: Simple combinations of atoms functioning as a unit (`SearchBar`, `FormField`).
- **`organisms/`**: Complex UI blocks built from molecules/atoms (`Header`, `DataTable`).

### Component Folder Pattern

Each component folder must be isolated and strictly co-locate its assets:

```text
src/components/{tier}/{ComponentName}/
├── {ComponentName}.tsx          # Component implementation
├── {ComponentName}.module.scss   # Sass Module styles
├── {ComponentName}.stories.tsx # Storybook story (CSF3)
└── {ComponentName}.test.tsx    # Vitest component test
```

---

## 2. Styling Standards (Sass Modules & Hybrid Theming)

- **Scoping**: Always use **Sass Modules** (`*.module.scss`). Never write un-scoped global styles inside component directories.
- **Tokens Location**: Global variables, mixins, and design tokens live under `src/styles/`:
  - `src/styles/tokens/_colors.scss`
  - `src/styles/tokens/_typography.scss`
  - `src/styles/_mixins.scss`
  - `src/styles/main.scss`

### Hybrid Styling Rules

- **CSS Custom Properties (Native CSS Variables)**: Use for dynamic theme tokens (colors, surface backgrounds, spacing) to support dark/light mode toggles.
  ```scss
  .button {
    background-color: var(--color-primary);
    color: var(--color-surface);
  }
  ```
- **Sass Variables & Mixins**: Use for compile-time logic, layout helpers, z-index scales, and media query breakpoints (via `@use 'src/styles/mixins' as *;`).

---

## 3. React Component Architecture (React 19 & TypeScript)

- **Props Interfaces**: Use `interface` for all component props (e.g., `interface ButtonProps`). Use `type` only for unions, primitives, or utility logic.
- **HTML Attribute Extension**: Primitive/Atom components must extend native element props via `React.ComponentProps<'element'>` (e.g., `ComponentProps<'button'>`) to natively support attributes like `disabled`, `onClick`, and `aria-*`.
- **React 19 `ref` Prop**: **Never use `React.forwardRef`**. In React 19, `ref` is a native prop—destructure `ref` directly alongside other props in the component signature.

```tsx
import React, { type ComponentProps } from 'react';
import styles from './Button.module.scss';

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ref,
  ...rest
}: ButtonProps) => {
  return (
    <button
      ref={ref}
      className={[styles.button, styles[variant], styles[size], className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </button>
  );
};
```

---

## 4. Documentation & Storybook (CSF3 & Storybook 8/10)

- **Story Format**: Use **Component Story Format 3 (CSF3)** with the `satisfies` operator for strict type safety.
- **Autodocs**: Include `tags: ['autodocs']` on the `meta` definition.
- **Interaction Tests**: Include a `play` function using `@storybook/test` (`userEvent`, `within`, `expect`) to test browser interactions directly inside stories where applicable.

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Click Me',
  },
};
```

---

## 5. Testing & Code Quality Standards

- **Testing Engine**: Vitest runs in **Browser Mode** using **Playwright/Chromium** (not `jsdom`).
- **Test Implementation**: Write interaction and visual logic tests using `@testing-library/react` inside `{ComponentName}.test.tsx`.
- **Code Style & Formatting**:
  - **Prettier Compliance**: All generated code must strictly adhere to the formatting rules defined in the project's `.prettierrc` configuration file.
  - **ESLint Compliance**: All generated code must conform to the linting rules and best practices enforced in the project's ESLint configuration (`.eslintrc` / `eslint.config.js`).
  - **Consistency**: Ensure syntax, indentation, quote styles, and trailing commas match the local project setup precisely without causing lint errors or requiring manual reformatting.
  - Favor named exports (`export const Button = ...`) over default exports.
  - Strict TypeScript rules (avoid `any`, enforce strict checks).
- **Git Commit Messages**: Follow Conventional Commits format (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`).
