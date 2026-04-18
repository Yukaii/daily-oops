import Head from 'next/head'
import { useRouter } from 'next/router'

import PostRow from '@/components/PostRow'
import { getMessages, normalizeLocale } from '@/lib/i18n'
import {
  getAllPostsWithSlug,
  POSTS_REVALIDATE_SECONDS,
  toPostPreview,
} from '@/lib/post'
import { PostsWithoutContent as BlogProps } from '@/types'

export default function Blog({ posts }: BlogProps) {
  const { locale } = useRouter()
  const currentLocale = normalizeLocale(locale)
  const copy = getMessages(currentLocale)

  return (
    <article>
      <Head>
        <title>{copy.pages.blogTitle} | Daily Oops!</title>
      </Head>

      <div
        className="d-block mx-auto markdown-body py-4 px-3"
        style={{ maxWidth: 680 }}
      >
        <div className="Box">
          {posts.map((post, index) => (
            <PostRow
              post={post}
              index={index}
              key={post.id}
              totalCount={posts.length}
            />
          ))}
        </div>

        <a href="/feed.xml">
          <button className="mt-3 btn btn-primary" type="button">
            {copy.home.subscribeViaRss}
          </button>
        </a>
      </div>
    </article>
  )
}

export async function getStaticProps() {
  const posts = await getAllPostsWithSlug()

  return {
    props: {
      posts: posts.map(toPostPreview),
    },
    revalidate: POSTS_REVALIDATE_SECONDS,
  }
}
