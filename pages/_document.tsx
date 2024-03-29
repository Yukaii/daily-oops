import { Head, Html, Main, NextScript } from 'next/document'

import Intro from '@/components/Intro'
import {
  NEXT_PUBLIC_DOMAIN,
  NEXT_PUBLIC_GA_TRACKING_ID,
  NEXT_PUBLIC_GITHUB_USERNAME,
} from '@/lib/constants'

export default function Document() {
  const isProduction = process.env.NODE_ENV === 'production'

  return (
    <Html lang="zh-Hant-TW" data-dark-theme="dark" data-light-theme="light">
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS feed for blog posts"
          href={`https://${process.env.DOMAIN}/feed.xml`}
        />
        <a
          href={`https://github.com/${NEXT_PUBLIC_GITHUB_USERNAME}`}
          rel="me"
          style={{ display: 'none' }}
        >
          github.com/{NEXT_PUBLIC_GITHUB_USERNAME}
        </a>
        <link
          rel="webmention"
          href={`https://webmention.io/${NEXT_PUBLIC_DOMAIN}/webmention`}
        />

        {isProduction && (
          <div>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_GA_TRACKING_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    window.gtag = gtag
                    gtag('js', new Date());
  
                    gtag('config', '${NEXT_PUBLIC_GA_TRACKING_ID}', {
                      page_path: window.location.pathname,
                    });
                  `,
              }}
            />
          </div>
        )}
      </Head>
      <body>
        <Main />
        <NextScript />

        <div style={{ display: 'none' }}>
          <span className="h-card">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a rel="me" href="/" className="p-name">
              Yukai Huang
            </a>

            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a rel="me" className="u-url" href="/">
              https://{NEXT_PUBLIC_DOMAIN}
            </a>
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            <img className="u-featured" src="/cover.png" />

            {/* eslint-disable-next-line @next/next/no-html-link-for-pages, @next/next/no-img-element, jsx-a11y/alt-text */}
            <img className="u-photo" src="/avatar.jpg" />

            <div className="p-note">
              <Intro />
            </div>

            <a
              className="u-bridgy-fed"
              href="https://fed.brid.gy/"
              rel="bridgy"
            >
              https://fed.brid.gy/
            </a>
          </span>
        </div>
      </body>
    </Html>
  )
}
