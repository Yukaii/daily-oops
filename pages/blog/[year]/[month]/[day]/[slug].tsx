import Giscus from '@giscus/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { SRLWrapper } from 'simple-react-lightbox'

import { IframePreviewCardProvider } from '@/components/IframePreviewCard'
import Markdown from '@/components/Markdown'
// import { DiscussionEmbed } from 'disqus-react'
import { config } from '@/lib/config'
import { NEXT_PUBLIC_DOMAIN } from '@/lib/constants'
import dayjs from '@/lib/dayjs'
import {
  getDayjsLocale,
  getLocalizedPath,
  getMessages,
  normalizeLocale,
} from '@/lib/i18n'
import {
  formatPostsAsParams,
  getAllPostsWithSlug,
  getPostData,
  POSTS_REVALIDATE_SECONDS,
} from '@/lib/post'
import { PostDate, PostMeta } from '@/types'

type PostPageParams = PostDate & {
  slug: string
}

type PostProps = {
  content: string
  title: string
  params: PostPageParams
  noteId: string
  meta: PostMeta
}

export default function Post({
  content,
  title,
  params,
  noteId,
  meta,
}: PostProps) {
  const { locale } = useRouter()
  const currentLocale = normalizeLocale(locale)
  const copy = getMessages(currentLocale)
  const { year, month, day, slug } = params
  const date = dayjs(`${year}-${month}-${day}`)
  const localizedDate = date.locale(getDayjsLocale(currentLocale)).format('LL')
  const canonicalUrl = `https://${NEXT_PUBLIC_DOMAIN}${getLocalizedPath(
    `/blog/${year}/${month}/${day}/${slug}`,
    currentLocale,
  )}`
  const description = content.slice(0, 150)
  const time = date.format()

  const { resolvedTheme } = useTheme()
  const [layoutDarkMode, setLayoutDarkMode] = useState(resolvedTheme)
  useEffect(() => {
    if (typeof window === 'undefined') return

    window.setTimeout(() => {
      setLayoutDarkMode(resolvedTheme)
    }, 100)
  }, [resolvedTheme])

  const hackmdLink = () => (
    <a
      className="no-underline color-fg-default text-semibold"
      href={config.hackmdBaseUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <i className="fas fa-file-alt" /> HackMD
    </a>
  )
  const noteLink = `${config.hackmdBaseUrl}/s/${noteId}`

  return (
    <section className="h-entry">
      <NextSeo
        title={title}
        description={description}
        titleTemplate="%s | Daily Oops!"
        openGraph={{
          type: 'article',
          locale: copy.openGraphLocale,
          url: canonicalUrl,
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

      {/* h-entry attributes */}
      <div style={{ display: 'none' }}>
        <time className="dt-published">
          {/* ISO-8601 */}
          {date.format()}
        </time>

        <a className="u-url" href={canonicalUrl}>
          {canonicalUrl}
        </a>

        <span className="p-name">{title}</span>

        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a rel="author" className="p-author h-card" href="/">
          Yukai Huang
        </a>

        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img className="u-photo" src="/avatar.jpg" />

        <a className="u-bridgy-fed" href="https://fed.brid.gy/">
          https://fed.brid.gy/
        </a>
      </div>

      <div>
        {meta?.image && (
          <div className="container pt-4 pb-1 px-3">
            <Image
              src={meta.image}
              style={{ maxWidth: '100%', borderRadius: 6, width: '100%' }}
              alt={copy.post.coverImageAlt}
              className="u-photo"
              width={820}
              height={312}
            />
          </div>
        )}
        <div className="container pt-4 pb-3 px-3">
          <span className="text-mono color-fg-muted">{localizedDate}</span>
        </div>
        <IframePreviewCardProvider>
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
        </IframePreviewCardProvider>

        <div className="container py-3 px-3">
          <div className="container-block color-bg-accent color-border-accent-emphasis rounded-2 p-3">
            {currentLocale === 'zh-TW' ? (
              <>
                {copy.post.publishedWithHackmdPrefix} {hackmdLink()}{' '}
                <a target="_blank" href={noteLink} rel="noopener noreferrer">
                  {copy.post.publishedLinkLabel}
                </a>
                。
              </>
            ) : (
              <>
                <a target="_blank" href={noteLink} rel="noopener noreferrer">
                  {copy.post.noteLinkLabel}
                </a>{' '}
                {copy.post.publishedWithHackmdPrefix} {hackmdLink()}.
              </>
            )}
          </div>
        </div>

        <div className="container py-3 px-3">
          <Giscus
            id="comments"
            repo="Yukaii/daily-oops"
            repoId="MDEwOlJlcG9zaXRvcnkzMDExNTExNTI="
            category="Comments"
            categoryId="DIC_kwDOEfMzsM4CZEHc"
            mapping="pathname"
            term="Welcome to Daily Oops"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme={layoutDarkMode === 'dark' ? 'dark' : 'light'}
            lang={copy.post.giscusLang}
            loading="lazy"
          />
        </div>

        {/* {disqus && ( */}
        {/*   <div className="container py-3 px-3"> */}
        {/*     <DiscussionEmbed */}
        {/*       shortname={disqus.shortname} */}
        {/*       config={{ */}
        {/*         url: url, */}
        {/*         identifier: url, */}
        {/*         title: title, */}
        {/*         language: 'zh_TW', */}
        {/*       }} */}
        {/*       darkmode={JSON.stringify(layoutDarkMode)} */}
        {/*     /> */}
        {/*   </div> */}
        {/* )} */}
      </div>
    </section>
  )
}

export async function getStaticProps({ params }: { params: PostPageParams }) {
  const post = await getPostData(params)

  if (!post) {
    return {
      notFound: true,
      revalidate: POSTS_REVALIDATE_SECONDS,
    }
  }

  const { content, title, id, meta } = post

  return {
    props: {
      content,
      title,
      params,
      noteId: id,
      meta,
    },
    revalidate: POSTS_REVALIDATE_SECONDS,
  }
}

export async function getStaticPaths({ locales }: { locales?: string[] }) {
  const posts = formatPostsAsParams(await getAllPostsWithSlug())
  const paths =
    locales?.flatMap((locale) =>
      posts.map((path) => ({
        ...path,
        locale,
      })),
    ) ?? posts

  return {
    paths,
    fallback: 'blocking',
  }
}
