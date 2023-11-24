import Link from 'next/link'

import Intro from '@/components/Intro'

const HideItems = () => {
  return (
    <div style={{ display: 'none' }}>
      <span className="h-card">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <Link rel="me" href="/" className="p-name">
          Yukai Huang
        </Link>

        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <Link rel="me" className="u-url" href="/">
          https://{process.env.NEXT_PUBLIC_DOMAIN}
        </Link>
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img className="u-featured" src="/cover.png" />

        {/* eslint-disable-next-line @next/next/no-html-link-for-pages, @next/next/no-img-element, jsx-a11y/alt-text */}
        <img className="u-photo" src="/avatar.jpg" />

        <div className="p-note">
          <Intro />
        </div>

        <Link className="u-bridgy-fed" href="https://fed.brid.gy/" rel="bridgy">
          https://fed.brid.gy/
        </Link>
      </span>
    </div>
  )
}

export default HideItems
