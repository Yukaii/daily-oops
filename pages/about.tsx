import Head from 'next/head'
import { useRouter } from 'next/router'

import Markdown from '@/components/Markdown'
import { getMessages, normalizeLocale } from '@/lib/i18n'
import { fetchPostData } from '@/lib/post'

type AboutProps = {
  content: string
}

export default function About({ content }: AboutProps) {
  const { locale } = useRouter()
  const currentLocale = normalizeLocale(locale)
  const copy = getMessages(currentLocale)

  return (
    <div>
      <Head>
        <title>{copy.pages.aboutTitle} | Daily Oops!</title>
      </Head>

      <Markdown content={content} className="container pt-4 pb-6 px-3" />
    </div>
  )
}

export async function getStaticProps() {
  const content = await fetchPostData(process.env.ABOUT_ME_NOTE_ID!)

  return {
    props: {
      content,
    },
  }
}
