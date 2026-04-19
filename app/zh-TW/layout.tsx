import type { ReactNode } from 'react'

import SiteLayout from '@/app/_components/site-layout'

type TraditionalChineseLayoutProps = {
  children: ReactNode
}

export default function TraditionalChineseLayout({
  children,
}: TraditionalChineseLayoutProps) {
  return <SiteLayout locale="zh-TW">{children}</SiteLayout>
}
