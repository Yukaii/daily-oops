import {
  AboutPage,
  getStaticPageMetadata,
} from '@/app/_components/content-pages'

export const metadata = getStaticPageMetadata('zh-TW', 'about')

export default function Page() {
  return <AboutPage locale="zh-TW" />
}
