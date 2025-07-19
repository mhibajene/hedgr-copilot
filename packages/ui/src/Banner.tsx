// packages/ui/src/Banner.tsx
import React from 'react';

export function Banner({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full py-8 px-4 \
                    bg-gradient-to-r \
                      from-hedgr-start \
                      via-hedgr-middle \
                      to-hedgr-end \
                    text-center">
      {children}
    </div>
  );
}
