import Head from 'next/head'
import Router from 'next/router'

import '@primer/css/index.scss'
import 'styles/globals.css'
import 'styles/primer-dark.scss'

import 'highlight.js/styles/github-gist.css'
import { pageview } from 'lib/gtag'

Router.events.on('routeChangeComplete', (url) => process.env.NODE_ENV === 'production' && pageview(url))

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <meta name="color-scheme" content="dark light" />
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp
