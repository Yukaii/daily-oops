import Link from 'next/link'

import { getMessages } from '@/lib/i18n'

type IntroProps = {
  locale?: string
}

export default function Intro({ locale }: IntroProps) {
  const copy = getMessages(locale)

  return (
    <>
      <h2>{copy.home.greeting}</h2>

      <p>{copy.home.description}</p>

      <p>
        {copy.home.introBeforeBlog}
        <Link href="/blog">{copy.home.introBlog}</Link>
        {copy.home.introBetweenBlogAndProjects}
        <Link href="/projects">{copy.home.introProjects}</Link>
        {copy.home.introBetweenProjectsAndAbout}
        <Link href="/about">{copy.home.introAbout}</Link>
        {copy.home.introAfterAbout}
      </p>

      <p>安久吧！</p>
    </>
  )
}
