'use client'

import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'

import PageViewTracker from './page-view-tracker'

type ProvidersProps = {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="data-color-mode">
      <PageViewTracker />
      {children}
    </ThemeProvider>
  )
}
