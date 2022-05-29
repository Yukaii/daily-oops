import Document, { Html, Head, Main, NextScript } from 'next/document'
import { NEXT_PUBLIC_GA_TRACKING_ID } from 'lib/constants'

class MyDocument extends Document {
  render() {
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

          {isProduction && (
            <t>
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
            </t>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
