import Markdown from 'components/Markdown'
import { fetchPostData } from 'lib/post'
import Head from 'next/head'

export default function About({ content }) {
  return (
    <div>
      <Head>
        <title>About me | Daily Oops!</title>
      </Head>

      <Markdown content={content} className="container pt-4 pb-6 px-3" />
    </div>
  )
}

export async function getStaticProps() {
  const content = await fetchPostData(process.env.ABOUT_ME_NOTE_ID)

  return {
    props: {
      content,
    },
  }
}
