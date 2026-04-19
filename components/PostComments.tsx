'use client'

import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { AppLocale, getMessages } from '@/lib/i18n'

type PostCommentsProps = {
  locale: AppLocale
}

export default function PostComments({ locale }: PostCommentsProps) {
  const copy = getMessages(locale)
  const { resolvedTheme } = useTheme()
  const [layoutDarkMode, setLayoutDarkMode] = useState(resolvedTheme)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.setTimeout(() => {
      setLayoutDarkMode(resolvedTheme)
    }, 100)
  }, [resolvedTheme])

  return (
    <Giscus
      id="comments"
      repo="Yukaii/daily-oops"
      repoId="MDEwOlJlcG9zaXRvcnkzMDExNTExNTI="
      category="Comments"
      categoryId="DIC_kwDOEfMzsM4CZEHc"
      mapping="pathname"
      term="Welcome to Daily Oops"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={layoutDarkMode === 'dark' ? 'dark' : 'light'}
      lang={copy.post.giscusLang}
      loading="lazy"
    />
  )
}
