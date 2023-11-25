import { omit } from 'lodash-es'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

import Intro from '@/components/Intro'
import PostRow from '@/components/PostRow'
import { getAllPostsWithSlug } from '@/lib/post'
import { writeRSS } from '@/lib/rss'
import { Posts as PostsProps, PostsWithoutContent as HomeProps } from '@/types'

export default function Home({ posts }: HomeProps) {
  return (
    <div className="h-entry">
      <NextSeo
        title="Daily Oops!"
        titleTemplate="%s"
        description="Yukai's blog. Web tech, apps, photos, and notes."
        openGraph={{
          type: 'article',
          locale: 'zh-Hant-TW',
          title: 'Daily Oops!',
          site_name: 'Daily Oops!',
        }}
      />

      <div className="d-block mx-auto container markdown-body py-4 px-3 e-content">
        <Intro />

        {/* workaround for webmention to bridgy */}
        <a href="https://fed.brid.gy/" style={{ display: 'none' }}>
          https://fed.brid.gy/
        </a>

        <h2>Recent posts</h2>

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
            More posts
          </button>
        </Link>

        <a href="/feed.xml">
          <button className="mt-3 btn btn-primary" type="button">
            Subscribe via RSS
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
      posts: posts.map((post: PostsProps) => omit(post, ['content'])),
    },
  }
}
