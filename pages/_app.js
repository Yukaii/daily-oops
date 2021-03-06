import Head from 'next/head'
import Router from 'next/router'
import SimpleReactLightbox from 'simple-react-lightbox'
import { AnimatePresence } from 'framer-motion'

import Header from 'components/Header'

import { pageview } from 'lib/gtag'
import { usePrimerDarkMode } from 'lib/usePrimerDarkMode'

import '@primer/css/index.scss'
import 'styles/globals.scss'
import 'styles/primer-dark.scss'
import 'styles/linegutter.scss'
import '@yukaii/github-highlightjs-themes/themes/github-light-default.css'

Router.events.on('routeChangeComplete', (url) => process.env.NODE_ENV === 'production' && pageview(url))

function MyApp({ Component, pageProps, router }) {
  
  usePrimerDarkMode()

  return <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      <meta name="color-scheme" content="dark light" />
    </Head>
    <SimpleReactLightbox>
      <AnimatePresence>
        <Header />
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </SimpleReactLightbox>
  </>
}

export default MyApp
