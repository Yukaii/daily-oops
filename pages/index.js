import Head from 'next/head'
import { getAllPostsWithSlug } from '../lib/post'

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container markdown-body">
        <ul>
          { posts.map(post => {
            const { date: { year, month, day }, slug } = post

            return <li key={post.id}>
              <a href={`/blog/${year}/${month}/${day}/${slug}`}>{post.title}</a>
            </li>}
            ) }
        </ul>
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
