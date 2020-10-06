import Head from 'next/head'
import Link from 'next/link'

import { getAllPostsWithSlug } from '../lib/post'
import Header from '../components/Header'

export default function Home({ posts }) {

  const postRows = posts.map(post => {
  const { date: { year, month, day }, slug } = post


  return <div className="Box-row d-flex flex-items-center" key={post.id}>
    <div className="flex-auto">
      <Link href={`/blog/${year}/${month}/${day}/${slug}`}>
        <a>
          <strong>{post.title}</strong>
        </a>
      </Link>

      <div className="text-small text-gray-light">
        Description
      </div>
    </div>
  </div>
  })

  return (
    <div>
      <Head>
        <title>Daily Oops!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="d-block mx-auto markdown-body py-4" style={{ maxWidth: 700 }}>
        <div className="Box">
          {postRows}
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const posts = await getAllPostsWithSlug()

  return {
    props: {
      posts
    }
  }
}
