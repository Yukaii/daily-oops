import type { ReactNode } from 'react'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Intro from '@/components/Intro'
import KeyboardShortcuts from '@/components/KeyboardShortcuts'
import ScrollProgress from '@/components/ScrollProgress'
import {
  NEXT_PUBLIC_DOMAIN,
  NEXT_PUBLIC_GITHUB_USERNAME,
} from '@/lib/constants'
import { AppLocale, DEFAULT_LOCALE, getLocalizedPath } from '@/lib/i18n'

type SiteLayoutProps = {
  children: ReactNode
  locale: AppLocale
}

export default function SiteLayout({ children, locale }: SiteLayoutProps) {
  const homePath = getLocalizedPath('/', locale)
  const canonicalHomeUrl = `https://${NEXT_PUBLIC_DOMAIN}${homePath}`

  return (
    <>
      <KeyboardShortcuts locale={locale} />
      <Header locale={locale} />
      {children}
      <Footer />
      <ScrollProgress />

      <div style={{ display: 'none' }}>
        <span className="h-card">
          <a rel="me" href={homePath} className="p-name">
            Yukai Huang
          </a>
          <a rel="me" className="u-url" href={canonicalHomeUrl}>
            {canonicalHomeUrl}
          </a>
          {NEXT_PUBLIC_GITHUB_USERNAME ? (
            <a
              href={`https://github.com/${NEXT_PUBLIC_GITHUB_USERNAME}`}
              rel="me"
            >
              github.com/{NEXT_PUBLIC_GITHUB_USERNAME}
            </a>
          ) : null}
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img className="u-featured" src="/cover.png" />
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img className="u-photo" src="/avatar.jpg" />

          <div className="p-note">
            <Intro locale={locale ?? DEFAULT_LOCALE} />
          </div>

          <a className="u-bridgy-fed" href="https://fed.brid.gy/" rel="bridgy">
            https://fed.brid.gy/
          </a>
        </span>
      </div>
    </>
  )
}
