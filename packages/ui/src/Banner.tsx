// packages/ui/src/Banner.tsx
import React, { ReactNode } from 'react'

type BannerProps = {
  children?: ReactNode
  className?: string
}

export function Banner({ children, className = '' }: BannerProps) {
  return (
    <div
      className={`w-full border-y border-hedgr-200 bg-hedgr-100 px-4 py-8 text-center text-hedgr-800 ${className}`}
    >
      {children ?? <span className="text-sm font-medium">Hedgr UI ready</span>}
    </div>
  )
}
