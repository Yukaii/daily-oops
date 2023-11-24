import Head from 'next/head'

import Markdown from '@/components/Markdown'
import { loadProjectMarkdown } from '@/lib/project'

type ProjectsProps = {
  content: string
}

const olderProjectAnnouncement = `# Projects
Here are some of my projects that I've worked on.\n
For older projects, please visit my [GitHub](https://github.com/Yukaii), or take a look at [here](./oldProjects).`

export default function Projects({ content }: ProjectsProps) {
  return (
    <div>
      <Head>
        <title>Projects | Daily Oops!</title>
      </Head>

      <Markdown
        content={olderProjectAnnouncement}
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
