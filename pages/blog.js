import Head from 'next/head'
import { motion } from 'framer-motion';

import { getAllPostsWithSlug } from 'lib/post'
import Header from 'components/Header'
import PostRow from 'components/PostRow'
import { springSimple } from 'lib/transition'

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
        <motion.div 
          className="Box"
          layoutId='blogList'
          {...springSimple}
        >
          {
            posts.map(
              (post, index) =>
                <PostRow post={post} index={index} key={post.id} totalCount={posts.length} />
            )
          }
        </motion.div>

        <a href='/feed.xml'>
          <button className='mt-3 btn btn-primary' type='button'>Subscribe via RSS</button>
        </a>
      </div>
    </article>
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
