import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import BlogPageSearch from '@/components/BlogPageSearch'
import { IframePreviewCardProvider } from '@/components/IframePreviewCard'
import Intro from '@/components/Intro'
import Lightbox from '@/components/Lightbox'
import Markdown from '@/components/Markdown'
import PostComments from '@/components/PostComments'
import PostRow from '@/components/PostRow'
import { config } from '@/lib/config'
import { NEXT_PUBLIC_DOMAIN } from '@/lib/constants'
import dayjs from '@/lib/dayjs'
import {
  AppLocale,
  getDayjsLocale,
  getLocalizedPath,
  getMessages,
} from '@/lib/i18n'
import {
  formatPostsAsParams,
  getAllPostsWithSlug,
  getPostData,
  toPostPreview,
  toSearchablePostPreview,
} from '@/lib/post'
import { loadProjectMarkdown, loadProjects } from '@/lib/project'
import { PostParams } from '@/types'

const SITE_NAME = 'Daily Oops!'

const getCanonicalUrl = (path: string, locale: AppLocale): string => {
  return `https://${NEXT_PUBLIC_DOMAIN}${getLocalizedPath(path, locale)}`
}

export function getStaticPageMetadata(
  locale: AppLocale,
  page: 'about' | 'blog' | 'home' | 'projects',
): Metadata {
  const copy = getMessages(locale)

  if (page === 'home') {
    return {
      title: {
        absolute: SITE_NAME,
      },
      description: copy.siteDescription,
      alternates: {
        canonical: getCanonicalUrl('/', locale),
      },
      openGraph: {
        type: 'website',
        locale: copy.openGraphLocale,
        title: SITE_NAME,
        description: copy.siteDescription,
        url: getCanonicalUrl('/', locale),
        siteName: SITE_NAME,
      },
    }
  }

  const title =
    page === 'about'
      ? copy.pages.aboutTitle
      : page === 'blog'
        ? copy.pages.blogTitle
        : copy.pages.projectsTitle
  const path =
    page === 'about' ? '/about' : page === 'blog' ? '/blog' : '/projects'

  return {
    title,
    description: copy.siteDescription,
    alternates: {
      canonical: getCanonicalUrl(path, locale),
    },
  }
}

export async function HomePage({ locale }: { locale: AppLocale }) {
  const copy = getMessages(locale)
  const posts = (await getAllPostsWithSlug()).map(toPostPreview)

  return (
    <div className="h-entry">
      <div className="d-block mx-auto container markdown-body py-4 px-3 e-content">
        <Intro locale={locale} />

        <a href="https://fed.brid.gy/" style={{ display: 'none' }}>
          https://fed.brid.gy/
        </a>

        <h2>{copy.home.recentPosts}</h2>

        <div className="Box">
          {posts.slice(0, 5).map((post, index) => (
            <PostRow
              post={post}
              index={index}
              key={post.id}
              locale={locale}
              totalCount={posts.length}
            />
          ))}
        </div>

        <Link href={getLocalizedPath('/blog', locale)}>
          <button className="mt-3 btn mr-2" type="button">
            {copy.home.morePosts}
          </button>
        </Link>

        <a href="/feed.xml">
          <button className="mt-3 btn btn-primary" type="button">
            {copy.home.subscribeViaRss}
          </button>
        </a>
      </div>
    </div>
  )
}

export async function BlogPage({ locale }: { locale: AppLocale }) {
  const copy = getMessages(locale)
  const posts = (await getAllPostsWithSlug()).map(toSearchablePostPreview)

  return (
    <article>
      <div
        className="d-block mx-auto markdown-body py-4 px-3"
        style={{ maxWidth: 680 }}
      >
        <h2>{copy.home.allPosts}</h2>

        <BlogPageSearch locale={locale} posts={posts} />

        <a href="/feed.xml">
          <button className="mt-3 btn btn-primary" type="button">
            {copy.home.subscribeViaRss}
          </button>
        </a>
      </div>
    </article>
  )
}

export function AboutPage({ locale }: { locale: AppLocale }) {
  const copy = getMessages(locale)

  return (
    <div>
      <Markdown
        content={copy.aboutMarkdown}
        className="container pt-4 pb-6 px-3"
      />
    </div>
  )
}

export async function ProjectsPage({ locale }: { locale: AppLocale }) {
  const copy = getMessages(locale)
  const content = await loadProjectMarkdown()

  return (
    <div>
      <Markdown
        content={copy.projectsAnnouncement}
        className="container pt-4 pb-2 px-3"
      />

      <Markdown content={content} className="container pt-4 pb-6 px-3" />
    </div>
  )
}

export function OldProjectsPage({ locale }: { locale: AppLocale }) {
  const projects = loadProjects(locale)

  return (
    <div
      className="markdown-body mx-auto pt-4 pb-6 px-3 container-lg"
      style={{ maxWidth: 700, columns: '6 250px', columnGap: '1rem' }}
    >
      {projects.map((project) => {
        return (
          <a
            className="Box d-inline-block ma-2 mb-5 overflow-hidden no-underline"
            href={project.link}
            target="_blank"
            style={{ width: 'calc(100% - 16px)', height: '100%' }}
            rel="noreferrer"
            key={project.link}
          >
            {project.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.image}
                style={{ borderRadius: 0 }}
                alt={project.image}
              />
            ) : null}
            <div className="px-3 pa-2">
              <h3 className="color-fg-default">{project.title}</h3>
              <p className="color-fg-muted">{project.description}</p>
            </div>
          </a>
        )
      })}
    </div>
  )
}

export async function PostPage({
  locale,
  params,
}: {
  locale: AppLocale
  params: PostParams
}) {
  const post = await getPostData(params)

  if (!post) {
    notFound()
  }

  const copy = getMessages(locale)
  const { year, month, day, slug } = params
  const date = dayjs(`${year}-${month}-${day}`)
  const localizedDate = date.locale(getDayjsLocale(locale)).format('LL')
  const canonicalUrl = getCanonicalUrl(
    `/blog/${year}/${month}/${day}/${slug}`,
    locale,
  )
  const noteLink = `${config.hackmdBaseUrl}/s/${post.id}`

  const hackmdLink = (
    <a
      className="no-underline color-fg-default text-semibold"
      href={config.hackmdBaseUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <i className="fas fa-file-alt" /> HackMD
    </a>
  )

  return (
    <section className="h-entry">
      <div style={{ display: 'none' }}>
        <time className="dt-published">{date.format()}</time>

        <a className="u-url" href={canonicalUrl}>
          {canonicalUrl}
        </a>

        <span className="p-name">{post.title}</span>

        <a
          rel="author"
          className="p-author h-card"
          href={getLocalizedPath('/', locale)}
        >
          Yukai Huang
        </a>

        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img className="u-photo" src="/avatar.jpg" />

        <a className="u-bridgy-fed" href="https://fed.brid.gy/">
          https://fed.brid.gy/
        </a>
      </div>

      <div>
        {post.meta?.image ? (
          <div className="container pt-4 pb-1 px-3">
            <Image
              src={post.meta.image}
              style={{ maxWidth: '100%', borderRadius: 6, width: '100%' }}
              alt={copy.post.coverImageAlt}
              className="u-photo"
              width={820}
              height={312}
            />
          </div>
        ) : null}
        <div className="container pt-4 pb-3 px-3">
          <span className="text-mono color-fg-muted">{localizedDate}</span>
        </div>
        <IframePreviewCardProvider>
          <Lightbox>
            <Markdown
              content={post.content}
              className="container post-container px-3"
            />
          </Lightbox>
        </IframePreviewCardProvider>

        <div className="container py-3 px-3">
          <div className="container-block color-bg-accent color-border-accent-emphasis rounded-2 p-3">
            {locale === 'zh-TW' ? (
              <>
                {copy.post.publishedWithHackmdPrefix} {hackmdLink}{' '}
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
                {copy.post.publishedWithHackmdPrefix} {hackmdLink}.
              </>
            )}
          </div>
        </div>

        <div className="container py-3 px-3">
          <PostComments locale={locale} />
        </div>
      </div>
    </section>
  )
}

export async function getPostPageMetadata(
  locale: AppLocale,
  params: PostParams,
): Promise<Metadata> {
  const post = await getPostData(params)

  if (!post) {
    return {}
  }

  const copy = getMessages(locale)
  const { year, month, day, slug } = params
  const date = dayjs(`${year}-${month}-${day}`).format()
  const canonicalUrl = getCanonicalUrl(
    `/blog/${year}/${month}/${day}/${slug}`,
    locale,
  )
  const description = post.content.slice(0, 150)

  return {
    title: post.title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      locale: copy.openGraphLocale,
      url: canonicalUrl,
      title: post.title,
      description,
      siteName: SITE_NAME,
      images: post.meta?.image ? [{ url: post.meta.image }] : [],
      publishedTime: date,
      modifiedTime: date,
    },
  }
}

export async function getBlogPostStaticParams(): Promise<PostParams[]> {
  return formatPostsAsParams(await getAllPostsWithSlug())
}
