import Head from 'next/head'
import { NextSeo } from 'next-seo'
import dayjs from 'lib/dayjs'
import { DiscussionEmbed } from 'disqus-react'
import useDarkMode from 'use-dark-mode'
import { SRLWrapper } from 'simple-react-lightbox'

import { getAllPostsWithSlug, formatPostsAsParams, getPostData } from 'lib/post'
import { getDisqusConfig } from 'lib/disqus'
import Header from 'components/Header'
import Markdown from 'components/Markdown'
import { useEffect, useState } from 'react'

export default function Post({ content, title, params, disqus }) {
  const { year, month, day, slug } = params
  const date = dayjs(`${year}-${month}-${day}`)
  const url = `https://${disqus?.domain}/blog/${year}/${month}/${day}/${slug}`
  const description = content.slice(0, 150)
  const time = date.format()

  const darkMode = useDarkMode()
  const [layoutDarkMode, setLayoutDarkMode] = useState(darkMode.value)
  useEffect(() => {
    window.setTimeout(() => {
      setLayoutDarkMode(darkMode.value)
    }, 100)
  }, [darkMode.value])

  return <section>
    <NextSeo
      title={title}
      description={description}
      titleTemplate='%s | Daily Oops!'
      openGraph={{
        type: 'article',
        locale: 'zh-Hant-TW',
        url,
        title,
        description,
        site_name: 'Daily Oops!',
        article: {
          publishedTime: time,
          modifiedTime: time,
        }        
      }}
    />

    <Header />
    <div className='container pt-4 pb-3 px-3' style={{ maxWidth: 630 }}>
      <span className='text-mono color-text-tertiary'>{ date.format('LL') }</span>
    </div>
    <SRLWrapper options={{
      settings: {
        lightboxTransitionSpeed: 0.1,
        slideAnimationType: 'both',
        slideSpringValues: [350, 50],
        slideTransitionTimingFunction: 'easeInOut'
      },
    }}>
      <Markdown content={content} className='container post-container pb-6 px-3' />
    </SRLWrapper>
    {
      disqus && <div className='container py-3 px-3'>
        <DiscussionEmbed
          shortname={disqus.shortname}
          config={{
            url: url,
            identifier: url,
            title: title,
            language: 'zh_TW'
          }}
          darkmode={JSON.stringify(layoutDarkMode)}
        />
      </div>
    }
  </section>
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

