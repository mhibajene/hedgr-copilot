// @vitest-environment jsdom

import React from 'react';
import { describe, test, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { EmptyState, ErrorState } from '@hedgr/ui';

// Cleanup after each test to avoid element leakage
afterEach(() => {
  cleanup();
});

describe('EmptyState Component', () => {
  test('renders title and description', () => {
    render(
      <EmptyState
        title="No transactions yet"
        description="Your history will appear here"
      />
    );

    expect(screen.getByText('No transactions yet')).toBeDefined();
    expect(screen.getByText('Your history will appear here')).toBeDefined();
  });

  test('renders with data-testid', () => {
    render(
      <EmptyState
        title="Empty"
        data-testid="custom-empty-state"
      />
    );

    expect(screen.getByTestId('custom-empty-state')).toBeDefined();
  });

  test('renders primary action as link when href provided', () => {
    render(
      <EmptyState
        title="No items"
        primaryAction={{ label: 'Add item', href: '/add' }}
      />
    );

    const link = screen.getByRole('link', { name: 'Add item' });
    expect(link).toBeDefined();
    expect(link.getAttribute('href')).toBe('/add');
  });

  test('renders primary action as button when onClick provided', () => {
    const handleClick = vi.fn();
    render(
      <EmptyState
        title="No items"
        primaryAction={{ label: 'Add item', onClick: handleClick }}
      />
    );

    const button = screen.getByRole('button', { name: 'Add item' });
    expect(button).toBeDefined();
    
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders secondary action', () => {
    const handleClick = vi.fn();
    render(
      <EmptyState
        title="No items"
        primaryAction={{ label: 'Primary', onClick: () => {} }}
        secondaryAction={{ label: 'Secondary', onClick: handleClick }}
      />
    );

    const button = screen.getByRole('button', { name: 'Secondary' });
    expect(button).toBeDefined();
    
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders custom icon', () => {
    render(
      <EmptyState
        title="Custom icon"
        icon={<span data-testid="custom-icon">Custom</span>}
      />
    );

    expect(screen.getByTestId('custom-icon')).toBeDefined();
  });

  test('renders default icon when no icon provided', () => {
    const { container } = render(
      <EmptyState title="Default icon" />
    );

    // Should have an SVG element (the default icon)
    const svg = container.querySelector('svg');
    expect(svg).toBeDefined();
  });

  test('renders without actions', () => {
    render(
      <EmptyState
        title="Just a message"
        description="No actions needed"
      />
    );

    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.queryByRole('link')).toBeNull();
  });
});

describe('ErrorState Component', () => {
  test('renders default title and description', () => {
    render(<ErrorState />);

    expect(screen.getByText('Something went wrong')).toBeDefined();
    expect(screen.getByText(/trouble loading this content/)).toBeDefined();
  });

  test('renders custom title and description', () => {
    render(
      <ErrorState
        title="Failed to load"
        description="Please check your connection"
      />
    );

    expect(screen.getByText('Failed to load')).toBeDefined();
    expect(screen.getByText('Please check your connection')).toBeDefined();
  });

  test('renders with data-testid', () => {
    render(
      <ErrorState
        title="Error"
        data-testid="custom-error-state"
      />
    );

    expect(screen.getByTestId('custom-error-state')).toBeDefined();
  });

  test('has role="alert" for accessibility', () => {
    render(<ErrorState title="Error" />);

    expect(screen.getByRole('alert')).toBeDefined();
  });

  test('renders retry action when provided', () => {
    const handleRetry = vi.fn();
    render(
      <ErrorState
        title="Error"
        primaryAction={{ label: 'Retry', onClick: handleRetry }}
      />
    );

    const button = screen.getByRole('button', { name: 'Retry' });
    expect(button).toBeDefined();
    
    fireEvent.click(button);
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });

  test('renders secondary action as link', () => {
    render(
      <ErrorState
        title="Error"
        secondaryAction={{ label: 'Go back', href: '/dashboard' }}
      />
    );

    const link = screen.getByRole('link', { name: 'Go back' });
    expect(link).toBeDefined();
    expect(link.getAttribute('href')).toBe('/dashboard');
  });

  test('renders both primary and secondary actions', () => {
    const handleRetry = vi.fn();
    render(
      <ErrorState
        title="Error"
        primaryAction={{ label: 'Try Again', onClick: handleRetry }}
        secondaryAction={{ label: 'Go Home', href: '/dashboard' }}
      />
    );

    expect(screen.getByRole('button', { name: 'Try Again' })).toBeDefined();
    expect(screen.getByRole('link', { name: 'Go Home' })).toBeDefined();
  });

  test('renders custom icon', () => {
    render(
      <ErrorState
        title="Error"
        icon={<span data-testid="custom-error-icon">!</span>}
      />
    );

    expect(screen.getByTestId('custom-error-icon')).toBeDefined();
  });

  test('renders default error icon when no icon provided', () => {
    const { container } = render(
      <ErrorState title="Error" />
    );

    // Should have an SVG element (the default error icon)
    const svg = container.querySelector('svg');
    expect(svg).toBeDefined();
  });
});

describe('Empty and Error State Integration', () => {
  test('EmptyState renders without crashing for minimal props', () => {
    expect(() => render(<EmptyState title="Test" />)).not.toThrow();
  });

  test('EmptyState renders without crashing with description', () => {
    expect(() => render(
      <EmptyState title="Test" description="Description" />
    )).not.toThrow();
  });

  test('EmptyState renders without crashing with actions', () => {
    expect(() => render(
      <EmptyState
        title="Test"
        primaryAction={{ label: 'Primary', onClick: () => {} }}
        secondaryAction={{ label: 'Secondary', href: '/test' }}
      />
    )).not.toThrow();
  });

  test('EmptyState renders without crashing with custom icon', () => {
    expect(() => render(
      <EmptyState title="Test" icon={<span>Icon</span>} />
    )).not.toThrow();
  });

  test('ErrorState renders without crashing for minimal props', () => {
    expect(() => render(<ErrorState />)).not.toThrow();
  });

  test('ErrorState renders without crashing with custom messages', () => {
    expect(() => render(
      <ErrorState title="Error" description="Description" />
    )).not.toThrow();
  });

  test('ErrorState renders without crashing with actions', () => {
    expect(() => render(
      <ErrorState
        title="Error"
        primaryAction={{ label: 'Retry', onClick: () => {} }}
        secondaryAction={{ label: 'Go back', href: '/test' }}
      />
    )).not.toThrow();
  });
});
