import {
  getStaticPageMetadata,
  ProjectsPage,
} from '@/app/_components/content-pages'

export const metadata = getStaticPageMetadata('en', 'projects')

export default function Page() {
  return <ProjectsPage locale="en" />
}
