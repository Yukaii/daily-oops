import {
  getStaticPageMetadata,
  HomePage,
} from '@/app/_components/content-pages'

export const metadata = getStaticPageMetadata('en', 'home')

export default function Page() {
  return <HomePage locale="en" />
}
