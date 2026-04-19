import {
  AboutPage,
  getStaticPageMetadata,
} from '@/app/_components/content-pages'

export const metadata = getStaticPageMetadata('en', 'about')

export default function Page() {
  return <AboutPage locale="en" />
}
