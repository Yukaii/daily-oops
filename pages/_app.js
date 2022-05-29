import '@primer/css/index.scss'
import 'styles/globals.scss'
import 'styles/primer-dark.scss'
import 'styles/linegutter.scss'
import '@yukaii/github-highlightjs-themes/themes/github-light-default.css'

import Header from 'components/Header'
import { pageview } from 'lib/gtag'
import Head from 'next/head'
import Router from 'next/router'
import { ThemeProvider } from 'next-themes'
import SimpleReactLightbox from 'simple-react-lightbox'

Router.events.on(
  'routeChangeComplete',
  (url) => process.env.NODE_ENV === 'production' && pageview(url)
)

function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
        <meta name="color-scheme" content="dark light" />
      </Head>

      <ThemeProvider attribute="data-color-mode">
        <SimpleReactLightbox>
          <Header />
          <Component {...pageProps} key={router.route} />
        </SimpleReactLightbox>
      </ThemeProvider>
    </>
  )
}

export default MyApp
