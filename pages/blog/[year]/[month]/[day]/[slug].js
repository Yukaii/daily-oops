import Head from 'next/head'

import { getAllPostsWithSlug, formatPostsAsParams, getPostData } from 'lib/post'
import Header from 'components/Header'
import Markdown from 'components/Markdown'

export default function Post({ content, title }) {
  return <div>
    <Head>
      <title>{ title } | Daily Oops!</title>
    </Head>

    <Header />
    <Markdown content={content} className='container pt-4 pb-6 px-3' />
  </div>
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const { content, title } = await getPostData(params)

  return {
    props: {
      content,
      title
    }
  }
}

export async function getStaticPaths() {
  const paths = formatPostsAsParams(await getAllPostsWithSlug())

  return {
    paths,
    fallback: false
  }
}

