import {
  BlogPage,
  getStaticPageMetadata,
} from '@/app/_components/content-pages'

export const metadata = getStaticPageMetadata('zh-TW', 'blog')
export const revalidate = 300

export default function Page() {
  return <BlogPage locale="zh-TW" />
}
