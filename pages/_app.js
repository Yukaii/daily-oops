import Head from 'next/head'
import Router from 'next/router'
import SimpleReactLightbox from 'simple-react-lightbox'
import '@fortawesome/fontawesome-free/js/all'

import { pageview } from 'lib/gtag'
import { usePrimerDarkMode } from 'lib/usePrimerDarkMode'

import '@primer/css/index.scss'
import 'styles/globals.scss'
import 'styles/primer-dark.scss'
import 'styles/linegutter.scss'
import 'highlight.js/styles/github-gist.css'

Router.events.on('routeChangeComplete', (url) => process.env.NODE_ENV === 'production' && pageview(url))

function MyApp({ Component, pageProps }) {
  
  usePrimerDarkMode()

  return <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <meta name="color-scheme" content="dark light" />
    </Head>
    <SimpleReactLightbox>
      <Component {...pageProps} />
    </SimpleReactLightbox>
  </>
}

export default MyApp
