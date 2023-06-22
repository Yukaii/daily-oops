import {
  NEXT_PUBLIC_DOMAIN,
  NEXT_PUBLIC_GA_TRACKING_ID,
  NEXT_PUBLIC_GITHUB_USERNAME,
} from 'lib/constants'
import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  const isProduction = process.env.NODE_ENV === 'production'

  return (
    <Html lang="zh-Hant-TW" data-dark-theme="dark">
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
          <span class="h-card">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a rel="me" href="/">
              Yukai Huang
            </a>
            <a rel="me" class="u-url">
              https://{NEXT_PUBLIC_DOMAIN}
            </a>
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            <img class="u-featured" src="/cover.png" />

            {/* eslint-disable-next-line @next/next/no-html-link-for-pages, @next/next/no-img-element, jsx-a11y/alt-text */}
            <img class="u-photo" src="/avatar.jpg" />
          </span>
        </div>
      </body>
    </Html>
  )
}
