// packages/ui/src/Banner.tsx
import React, { ReactNode } from 'react'

type BannerProps = {
  children?: ReactNode
  className?: string
}

export function Banner({ children, className = '' }: BannerProps) {
  return (
    <div
      className={`w-full py-8 px-4 bg-gradient-to-r from-hedgr-start via-hedgr-middle to-hedgr-end text-center ${className}`}
    >
      {children ?? <span className="text-sm">Hedgr UI ready</span>}
    </div>
  )
}
