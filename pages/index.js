import Head from 'next/head'
import Link from 'next/link'

import { getAllPostsWithSlug } from 'lib/post'
import Header from 'components/Header'
import PostRow from 'components/PostRow'

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Daily Oops!</title>
      </Head>

      <Header />

      <div className="d-block mx-auto markdown-body py-4 px-1" style={{ maxWidth: 700 }}>
        <h2>Hi</h2>

        <p>
          This is Yukai Huang's personal website.
        </p>

        <p>
          Here you can read my <Link href="/blog">recent posts</Link>, play with <Link href="/projects">my side projects before</Link>, or <Link href="/about">get to know me more</Link>.
        </p>

        <p>
          安久吧！
        </p>


        <h2>Recent posts</h2>

        <div className="Box">
          {
            posts.slice(0, 5).map(
              (post, index) =>
                <PostRow post={post} index={index} key={post.id} totalCount={posts.length} />
            )
          }
        </div>

        <Link href='/blog'>
          <button className='mt-3 btn' type='button'>Read More</button>
        </Link>
        </div>
    </div>
  )
}

export async function getStaticProps() {
  const posts = await getAllPostsWithSlug()

  return {
    props: {
      posts
    }
  }
}
