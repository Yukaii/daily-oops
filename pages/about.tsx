import Head from 'next/head'
import { useRouter } from 'next/router'

import Markdown from '@/components/Markdown'
import { getMessages, normalizeLocale } from '@/lib/i18n'

export default function About() {
  const { locale } = useRouter()
  const currentLocale = normalizeLocale(locale)
  const copy = getMessages(currentLocale)

  return (
    <div>
      <Head>
        <title>{copy.pages.aboutTitle} | Daily Oops!</title>
      </Head>

      <Markdown
        content={copy.aboutMarkdown}
        className="container pt-4 pb-6 px-3"
      />
    </div>
  )
}
