import '@primer/css/index.scss'
import 'styles/globals.scss'
import 'styles/primer-dark.scss'
import 'styles/linegutter.scss'
import '@yukaii/github-highlightjs-themes/themes/github-light-default.css'

import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import type { ReactNode } from 'react'

import {
  NEXT_PUBLIC_ADSENSE_ID,
  NEXT_PUBLIC_DOMAIN,
  NEXT_PUBLIC_GA_TRACKING_ID,
} from '@/lib/constants'
import { getMessages } from '@/lib/i18n'

import Providers from './providers'

const copy = getMessages('en')
const siteOrigin = `https://${NEXT_PUBLIC_DOMAIN ?? process.env.DOMAIN ?? 'localhost:3000'}`

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: 'Daily Oops!',
    template: '%s | Daily Oops!',
  },
  description: copy.siteDescription,
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark light',
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const isProduction = process.env.NODE_ENV === 'production'
  const domain = process.env.DOMAIN ?? NEXT_PUBLIC_DOMAIN ?? 'localhost:3000'

  return (
    <html
      lang="en"
      data-dark-theme="dark"
      data-light-theme="light"
      suppressHydrationWarning
    >
      <head>
        <meta httpEquiv="content-language" content="en" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS feed for blog posts"
          href={`https://${domain}/feed.xml`}
        />
        <link
          rel="webmention"
          href={`https://webmention.io/${NEXT_PUBLIC_DOMAIN}/webmention`}
        />
      </head>
      <body>
        {isProduction && NEXT_PUBLIC_GA_TRACKING_ID ? (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_GA_TRACKING_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${NEXT_PUBLIC_GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        ) : null}

        {isProduction && NEXT_PUBLIC_ADSENSE_ID ? (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${NEXT_PUBLIC_ADSENSE_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        ) : null}

        <Providers>
          <div id="app-root">{children}</div>
        </Providers>
      </body>
    </html>
  )
}
