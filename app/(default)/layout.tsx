import type { ReactNode } from 'react'

import SiteLayout from '@/app/_components/site-layout'

type DefaultLayoutProps = {
  children: ReactNode
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return <SiteLayout locale="en">{children}</SiteLayout>
}
