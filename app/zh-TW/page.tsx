import {
  getStaticPageMetadata,
  HomePage,
} from '@/app/_components/content-pages'
import PageViewTransition from '@/components/PageViewTransition'

export const metadata = getStaticPageMetadata('zh-TW', 'home')

// Served from ISR cache; post data revalidates via fetch cache (300s).
export const revalidate = 300

export default function Page() {
  return (
    <PageViewTransition>
      <HomePage locale="zh-TW" />
    </PageViewTransition>
  )
}
