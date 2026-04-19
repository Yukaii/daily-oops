import Link from 'next/link'

import { getLocalizedPath, getMessages } from '@/lib/i18n'

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
        <Link href={getLocalizedPath('/blog', locale)}>
          {copy.home.introBlog}
        </Link>
        {copy.home.introBetweenBlogAndProjects}
        <Link href={getLocalizedPath('/projects', locale)}>
          {copy.home.introProjects}
        </Link>
        {copy.home.introBetweenProjectsAndAbout}
        <Link href={getLocalizedPath('/about', locale)}>
          {copy.home.introAbout}
        </Link>
        {copy.home.introAfterAbout}
      </p>

      <p>{copy.home.signoff}</p>
    </>
  )
}
