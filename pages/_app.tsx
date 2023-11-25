import '@primer/css/index.scss'
import 'styles/globals.scss'
import 'styles/primer-dark.scss'
import 'styles/linegutter.scss'
import '@yukaii/github-highlightjs-themes/themes/github-light-default.css'

import Head from 'next/head'
import Router, { NextRouter } from 'next/router'
import { ThemeProvider } from 'next-themes'
import SimpleReactLightbox from 'simple-react-lightbox'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import ScrollProgress from '@/components/ScrollProgress'
import WithMounted from '@/components/WithMounted'
import { pageview } from '@/lib/gtag'

Router.events.on(
  'routeChangeComplete',
  (url) => process.env.NODE_ENV === 'production' && pageview(url)
)

type MyAppProps = {
  Component: React.ElementType
  pageProps: Record<string, unknown>
  router: NextRouter
}

function MyApp({ Component, pageProps, router }: MyAppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="color-scheme" content="dark light" />
      </Head>

      <ThemeProvider attribute="data-color-mode">
        <SimpleReactLightbox>
          <Header />
          <Component {...pageProps} key={router.route} />
          <Footer />

          <WithMounted>
            {({ mounted }) => mounted && <ScrollProgress />}
          </WithMounted>
        </SimpleReactLightbox>
      </ThemeProvider>
    </>
  )
}
export default MyApp
