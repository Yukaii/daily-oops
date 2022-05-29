import PostRow from 'components/PostRow'
import { getAllPostsWithSlug } from 'lib/post'
import { writeRSS } from 'lib/rss'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

export default function Home({ posts }) {
  return (
    <div>
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

      <div className="d-block mx-auto container markdown-body py-4 px-3">
        <h2>Hi</h2>

        <p>This is Yukai Huang&apos;s personal website.</p>

        <p>
          Here you can read my <Link href="/blog">recent posts</Link>, play with{' '}
          <Link href="/projects">my side projects before</Link>, or{' '}
          <Link href="/about">get to know me more</Link>.
        </p>

        <p>安久吧！</p>

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
            Read More
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
      posts,
    },
  }
}
