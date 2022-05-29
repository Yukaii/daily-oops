import Head from 'next/head'

import { getAllPostsWithSlug } from 'lib/post'
import PostRow from 'components/PostRow'

export default function Blog({ posts }) {
  return (
    <article>
      <Head>
        <title>Blog | Daily Oops!</title>
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
            Subscribe via RSS
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
      posts,
    },
  }
}
