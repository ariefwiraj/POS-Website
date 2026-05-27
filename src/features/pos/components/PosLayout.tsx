'use client'

import { PosSidebar } from './PosSidebar'
import { PosTopBar } from './PosTopBar'
import { PosBottomNav } from './PosBottomNav'

export function PosLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <PosSidebar />
      <div className="flex flex-col flex-1 h-full relative">
        <PosTopBar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden pb-[72px] lg:pb-0">
          {children}
        </main>
        <PosBottomNav />
      </div>
    </div>
  )
}
