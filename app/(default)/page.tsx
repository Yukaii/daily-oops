import {
  getStaticPageMetadata,
  HomePage,
} from '@/app/_components/content-pages'
import PageViewTransition from '@/components/PageViewTransition'

export const metadata = getStaticPageMetadata('en', 'home')

export default function Page() {
  return (
    <PageViewTransition>
      <HomePage locale="en" />
    </PageViewTransition>
  )
}
