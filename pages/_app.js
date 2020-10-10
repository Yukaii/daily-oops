import Head from 'next/head'

import '@primer/css/index.scss'
import 'styles/globals.css'

import 'highlight.js/styles/github-gist.css'

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp
