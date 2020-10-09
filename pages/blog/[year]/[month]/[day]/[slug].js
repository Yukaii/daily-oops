import Head from 'next/head'
import dayjs from 'lib/dayjs'

import { getAllPostsWithSlug, formatPostsAsParams, getPostData } from 'lib/post'
import Header from 'components/Header'
import Markdown from 'components/Markdown'

export default function Post({ content, title, params }) {
  const { year, month, day } = params
  const date = dayjs(`${year}-${month}-${day}`)

  return <div>
    <Head>
      <title>{ title } | Daily Oops!</title>
    </Head>

    <Header />
    <div className='container pt-4 pb-3 px-3'>
      <span className='text-mono text-gray-light'>{ date.format('LL') }</span>
    </div>
    <Markdown content={content} className='container pb-6 px-3' />
  </div>
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const { content, title } = await getPostData(params)

  return {
    props: {
      content,
      title,
      params
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

