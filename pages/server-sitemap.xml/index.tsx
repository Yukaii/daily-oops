import { GetServerSideProps } from 'next'
import { getServerSideSitemapLegacy } from 'next-sitemap'

import { formatPostsAsParams, getAllPostsWithSlug } from '@/lib/post'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const blogPaths = formatPostsAsParams(
    await getAllPostsWithSlug().catch((err) => err.message)
  )

  const blogPathsResult = blogPaths.map((item) => {
    const { year, month, day, slug } = item.params
    return {
      loc: `https://${process.env.DOMAIN}/blog/${year}/${month}/${day}/${slug}`,
      lastmod: new Date().toISOString(),
      priority: 0.7,
    }
  })

  return getServerSideSitemapLegacy(ctx, blogPathsResult)
}

// Default export to prevent next.js errors
export default function Sitemap() {}
