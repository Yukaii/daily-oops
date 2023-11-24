import Markdown from 'components/Markdown'
import Head from 'next/head'

import { loadProjectMarkdown } from '@/lib/project'

export default function Projects({ content }) {
  return (
    <div>
      <Head>
        <title>Projects | Daily Oops!</title>
      </Head>

      <Markdown
        content={`# Projects
Here are some of my projects that I've worked on.

For older peojcts, please visit my [GitHub](https://github.com/Yukaii), or take a look at [here](./oldProjects).
`}
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
