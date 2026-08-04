import {
  BlogPage,
  getStaticPageMetadata,
} from '@/app/_components/content-pages'
import PageViewTransition from '@/components/PageViewTransition'

export const metadata = getStaticPageMetadata('zh-TW', 'blog')
export const revalidate = 300

export default function Page() {
  return (
    <PageViewTransition>
      <BlogPage locale="zh-TW" />
    </PageViewTransition>
  )
}
