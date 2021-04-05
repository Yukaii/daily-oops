import Head from 'next/head'
import dayjs from 'lib/dayjs'
import { DiscussionEmbed } from 'disqus-react'
import { SRLWrapper } from 'simple-react-lightbox'

import { getAllPostsWithSlug, formatPostsAsParams, getPostData } from 'lib/post'
import { getDisqusConfig } from 'lib/disqus'
import Header from 'components/Header'
import Markdown from 'components/Markdown'

export default function Post({ content, title, params, disqus }) {
  const { year, month, day, slug } = params
  const date = dayjs(`${year}-${month}-${day}`)
  const url = `https://${disqus?.domain}/blog/${year}/${month}/${day}/${slug}`

  return <div>
    <Head>
      <title>{ title } | Daily Oops!</title>
    </Head>

    <Header />
    <div className='container pt-4 pb-3 px-3'>
      <span className='text-mono text-gray-light'>{ date.format('LL') }</span>
    </div>
    <SRLWrapper options={{
      settings: {
        lightboxTransitionSpeed: 0.3,
        slideTransitionSpeed: 0.3
      }
    }}>
      <Markdown content={content} className='container pb-6 px-3' />
    </SRLWrapper>
    {
      disqus && <div className='container py-3 px-3'>
        <DiscussionEmbed
          shortname={disqus.shortname}
          config={
            {
              url: url,
              identifier: url,
              title: title,
              language: 'zh_TW'
            }
          }
        />
      </div>
    }
  </div>
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const { content, title } = await getPostData(params)

  return {
    props: {
      content,
      title,
      params,
      disqus: getDisqusConfig()
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

