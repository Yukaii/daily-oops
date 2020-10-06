import Head from 'next/head'

import { getAllPostsWithSlug, formatPostsAsParams, getPostData } from '../../../../../lib/post'
import { render } from '../../../../../lib/markdown'
import Header from '../../../../../components/Header'

export default function Post({ content, title }) {
  return <div className='container'>
    <Head>
      <title>{ title } | Daily Oops!</title>
    </Head>

    <Header />
    <div className='markdown-body mx-auto pt-4 pb-6' dangerouslySetInnerHTML={{ __html: render(content) }} style={{ maxWidth: 700 }} />
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

