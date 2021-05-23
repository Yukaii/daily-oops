import Head from 'next/head'
import { motion } from 'framer-motion'

import Header from 'components/Header'
import Markdown from 'components/Markdown'

import { fetchPostData } from 'lib/post'
import { springSimple } from 'lib/transition'

export default function About ({ content }) {
  return <div>
    <Head>
      <title>About me | Daily Oops!</title>
    </Head>

    <Header />
    
    <motion.div {...springSimple} layoutId='about'>
      <Markdown content={content} className='container pt-4 pb-6 px-3' />
    </motion.div>
  </div>
}

export async function getStaticProps() {
  const content = await fetchPostData(process.env.ABOUT_ME_NOTE_ID)

  return {
    props: {
      content
    }
  }
}
