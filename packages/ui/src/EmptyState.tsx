// packages/ui/src/EmptyState.tsx
import React, { ReactNode } from 'react'

export type EmptyStateAction = {
  label: string
  onClick?: () => void
  href?: string
}

export type EmptyStateProps = {
  /** Main title describing the empty state */
  title: string
  /** Detailed description or guidance text */
  description?: string
  /** Icon to display (defaults to a generic empty icon) */
  icon?: ReactNode
  /** Primary action button */
  primaryAction?: EmptyStateAction
  /** Secondary action button */
  secondaryAction?: EmptyStateAction
  /** Additional CSS classes */
  className?: string
  /** Test ID for e2e testing */
  'data-testid'?: string
}

/**
 * EmptyState Component
 * 
 * A consistent empty state display for when there's no data to show.
 * Provides guidance and optional actions to help users understand what to do next.
 * 
 * @example
 * ```tsx
 * <EmptyState
 *   title="No transactions yet"
 *   description="Your deposit and withdrawal history will appear here"
 *   primaryAction={{ label: "Make your first deposit", href: "/deposit" }}
 * />
 * ```
 */
export function EmptyState({
  title,
  description,
  icon,
  primaryAction,
  secondaryAction,
  className = '',
  'data-testid': testId = 'empty-state',
}: EmptyStateProps) {
  const defaultIcon = (
    <svg
      className="h-12 w-12 text-gray-300"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
      />
    </svg>
  )

  const renderAction = (action: EmptyStateAction, isPrimary: boolean) => {
    const baseClasses = isPrimary
      ? 'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-blue-600 text-white hover:bg-blue-700'
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
      className={`text-center py-12 px-4 ${className}`}
    >
      <div className="mx-auto h-16 w-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
        {icon ?? defaultIcon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
          {description}
        </p>
      )}
      {(primaryAction || secondaryAction) && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {primaryAction && renderAction(primaryAction, true)}
          {secondaryAction && renderAction(secondaryAction, false)}
        </div>
      )}
    </div>
  )
}

export default EmptyState

