import '@primer/css/index.scss'
import 'styles/globals.scss'
import 'styles/primer-dark.scss'
import 'styles/linegutter.scss'
import '@yukaii/github-highlightjs-themes/themes/github-light-default.css'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import HideItems from '@/components/HideItems'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-Hant">
      <body>
        <Header />
        {children}
        <Footer />

        <HideItems />
      </body>
    </html>
  )
}
