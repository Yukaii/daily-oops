import Markdown from 'components/Markdown'
import { DiscussionEmbed } from 'disqus-react'
import { config } from 'lib/config'
import dayjs from 'lib/dayjs'
import { getDisqusConfig } from 'lib/disqus'
import { formatPostsAsParams, getAllPostsWithSlug, getPostData } from 'lib/post'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { SRLWrapper } from 'simple-react-lightbox'

export default function Post({ content, title, params, disqus, noteId, meta }) {
  const { year, month, day, slug } = params
  const date = dayjs(`${year}-${month}-${day}`)
  const url = `https://${disqus?.domain}/blog/${year}/${month}/${day}/${slug}`
  const description = content.slice(0, 150)
  const time = date.format()

  const { resolvedTheme } = useTheme()
  const [layoutDarkMode, setLayoutDarkMode] = useState(resolvedTheme)
  useEffect(() => {
    window.setTimeout(() => {
      setLayoutDarkMode(resolvedTheme)
    }, 100)
  }, [resolvedTheme])

  const hackmdLink = () => (
    <a
      className="no-underline color-text-primary text-semibold"
      href={config.hackmdBaseUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <i className="fas fa-file-alt" /> HackMD
    </a>
  )
  const noteLink = `${config.hackmdBaseUrl}/s/${noteId}`

  return (
    <section>
      <NextSeo
        title={title}
        description={description}
        titleTemplate="%s | Daily Oops!"
        openGraph={{
          type: 'article',
          locale: 'zh-Hant-TW',
          url,
          title,
          description,
          site_name: 'Daily Oops!',
          images: meta?.image
            ? [
                {
                  url: meta.image,
                },
              ]
            : [],
          article: {
            publishedTime: time,
            modifiedTime: time,
          },
        }}
      />

      <div>
        {meta?.image && (
          <div className="container pt-4 pb-1 px-3">
            <Image
              src={meta.image}
              style={{ maxWidth: '100%', borderRadius: 6, width: '100%' }}
              alt="cover image"
              className="u-photo"
              width={820}
              height={312}
            />
          </div>
        )}
        <div className="container pt-4 pb-3 px-3">
          <span className="text-mono color-text-tertiary">
            {date.format('LL')}
          </span>
        </div>
        <SRLWrapper
          options={{
            settings: {
              lightboxTransitionSpeed: 0.1,
              slideAnimationType: 'both',
              slideSpringValues: [350, 50],
              slideTransitionTimingFunction: 'easeInOut',
            },
          }}
        >
          <Markdown
            content={content}
            className="container post-container px-3"
          />
        </SRLWrapper>

        <div className="container py-3 px-3">
          <div className="container-block color-bg-info color-border-info rounded-2 p-3">
            本篇文章驕傲的使用 {hackmdLink()}{' '}
            <a target="_blank" href={noteLink} rel="noopener noreferrer">
              發佈
            </a>
            {/* For future i18n */
            /*
              This post is proudly <a target='_blank' href={noteLink}>published</a> with {hackmdLink()}
            */}
          </div>
        </div>

        {disqus && (
          <div className="container py-3 px-3">
            <DiscussionEmbed
              shortname={disqus.shortname}
              config={{
                url: url,
                identifier: url,
                title: title,
                language: 'zh_TW',
              }}
              darkmode={JSON.stringify(layoutDarkMode)}
            />
          </div>
        )}
      </div>
    </section>
  )
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const { content, title, id, meta } = await getPostData(params)

  return {
    props: {
      content,
      title,
      params,
      disqus: getDisqusConfig(),
      noteId: id,
      meta,
    },
  }
}

export async function getStaticPaths() {
  const paths = formatPostsAsParams(await getAllPostsWithSlug())

  return {
    paths,
    fallback: false,
  }
}
