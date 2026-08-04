import {
  BlogPage,
  getStaticPageMetadata,
} from '@/app/_components/content-pages'
import PageViewTransition from '@/components/PageViewTransition'

export const metadata = getStaticPageMetadata('en', 'blog')
export const revalidate = 300

export default function Page() {
  return (
    <PageViewTransition>
      <BlogPage locale="en" />
    </PageViewTransition>
  )
}
