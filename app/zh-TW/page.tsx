import {
  getStaticPageMetadata,
  HomePage,
} from '@/app/_components/content-pages'

export const metadata = getStaticPageMetadata('zh-TW', 'home')

export default function Page() {
  return <HomePage locale="zh-TW" />
}
