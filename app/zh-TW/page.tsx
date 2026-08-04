import {
  getStaticPageMetadata,
  HomePage,
} from '@/app/_components/content-pages'
import PageViewTransition from '@/components/PageViewTransition'

export const metadata = getStaticPageMetadata('zh-TW', 'home')

export default function Page() {
  return (
    <PageViewTransition>
      <HomePage locale="zh-TW" />
    </PageViewTransition>
  )
}
