import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import Intro from '@/components/Intro'
import PostRow from '@/components/PostRow'
import { getMessages, normalizeLocale } from '@/lib/i18n'
import { getAllPostsWithSlug, toPostPreview } from '@/lib/post'
import { writeRSS } from '@/lib/rss'
import { PostsWithoutContent as HomeProps } from '@/types'

export default function Home({ posts }: HomeProps) {
  const { locale } = useRouter()
  const currentLocale = normalizeLocale(locale)
  const copy = getMessages(currentLocale)

  return (
    <div className="h-entry">
      <NextSeo
        title="Daily Oops!"
        titleTemplate="%s"
        description={copy.siteDescription}
        openGraph={{
          type: 'article',
          locale: copy.openGraphLocale,
          title: 'Daily Oops!',
          site_name: 'Daily Oops!',
        }}
      />

      <div className="d-block mx-auto container markdown-body py-4 px-3 e-content">
        <Intro locale={currentLocale} />

        {/* workaround for webmention to bridgy */}
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
              totalCount={posts.length}
            />
          ))}
        </div>

        <Link href="/blog" passHref>
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

export async function getStaticProps() {
  const posts = await getAllPostsWithSlug()

  writeRSS(posts.slice(0, 10))

  return {
    props: {
      posts: posts.map(toPostPreview),
    },
  }
}
