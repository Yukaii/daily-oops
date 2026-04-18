import Head from 'next/head'
import { useRouter } from 'next/router'

import Markdown from '@/components/Markdown'
import { getMessages, normalizeLocale } from '@/lib/i18n'
import { loadProjectMarkdown } from '@/lib/project'

type ProjectsProps = {
  content: string
}

export default function Projects({ content }: ProjectsProps) {
  const { locale } = useRouter()
  const currentLocale = normalizeLocale(locale)
  const copy = getMessages(currentLocale)

  return (
    <div>
      <Head>
        <title>{copy.pages.projectsTitle} | Daily Oops!</title>
      </Head>

      <Markdown
        content={copy.projectsAnnouncement}
        className="container pt-4 pb-2 px-3"
      />

      <Markdown content={content} className="container pt-4 pb-6 px-3" />
    </div>
  )
}

export async function getStaticProps() {
  const content = await loadProjectMarkdown()
  return {
    props: {
      content,
    },
  }
}
