import {
  getStaticPageMetadata,
  ProjectsPage,
} from '@/app/_components/content-pages'

export const metadata = getStaticPageMetadata('zh-TW', 'projects')

export default function Page() {
  return <ProjectsPage locale="zh-TW" />
}
