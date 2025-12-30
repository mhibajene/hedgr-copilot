// packages/ui/src/ErrorState.tsx
import React, { ReactNode } from 'react'

export type ErrorStateAction = {
  label: string
  onClick?: () => void
  href?: string
}

export type ErrorStateProps = {
  /** Main error title */
  title?: string
  /** User-friendly error description (do NOT expose stack traces or sensitive data) */
  description?: string
  /** Icon to display (defaults to an error icon) */
  icon?: ReactNode
  /** Primary action (typically "Retry" or "Try again") */
  primaryAction?: ErrorStateAction
  /** Secondary action (e.g., "Go back", "Contact support") */
  secondaryAction?: ErrorStateAction
  /** Additional CSS classes */
  className?: string
  /** Test ID for e2e testing */
  'data-testid'?: string
}

/**
 * ErrorState Component
 * 
 * A consistent error state display for when something goes wrong.
 * IMPORTANT: Never expose raw error messages, stack traces, or sensitive data.
 * Always use user-friendly messages.
 * 
 * @example
 * ```tsx
 * <ErrorState
 *   title="Unable to load transactions"
 *   description="We couldn't fetch your transaction history. Please try again."
 *   primaryAction={{ label: "Retry", onClick: handleRetry }}
 *   secondaryAction={{ label: "Go back", href: "/dashboard" }}
 * />
 * ```
 */
export function ErrorState({
  title = 'Something went wrong',
  description = "We're having trouble loading this content. Please try again.",
  icon,
  primaryAction,
  secondaryAction,
  className = '',
  'data-testid': testId = 'error-state',
}: ErrorStateProps) {
  const defaultIcon = (
    <svg
      className="h-12 w-12 text-red-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
      />
    </svg>
  )

  const renderAction = (action: ErrorStateAction, isPrimary: boolean) => {
    const baseClasses = isPrimary
      ? 'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 bg-red-600 text-white hover:bg-red-700'
      : 'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 text-gray-600 hover:text-gray-800 hover:bg-gray-100'

    if (action.href) {
      return (
        <a href={action.href} className={baseClasses}>
          {action.label}
        </a>
      )
    }

    return (
      <button type="button" onClick={action.onClick} className={baseClasses}>
        {action.label}
      </button>
    )
  }

  return (
    <div
      data-testid={testId}
      role="alert"
      className={`text-center py-12 px-4 ${className}`}
    >
      <div className="mx-auto h-16 w-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
        {icon ?? defaultIcon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
        {description}
      </p>
      {(primaryAction || secondaryAction) && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {primaryAction && renderAction(primaryAction, true)}
          {secondaryAction && renderAction(secondaryAction, false)}
        </div>
      )}
    </div>
  )
}

export default ErrorState

