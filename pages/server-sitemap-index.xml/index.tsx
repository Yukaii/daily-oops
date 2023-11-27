import { GetServerSideProps } from 'next'
import { getServerSideSitemapIndexLegacy } from 'next-sitemap'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const urls = [
    `https://${process.env.DOMAIN}/about`,
    `https://${process.env.DOMAIN}/blog`,
    `https://${process.env.DOMAIN}/oldProjects`,
    `https://${process.env.DOMAIN}/projects`,
  ]

  return getServerSideSitemapIndexLegacy(ctx, urls)
}

// Default export to prevent next.js errors
export default function SitemapIndex() {}
