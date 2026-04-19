import { getAllPostsWithSlug } from '@/lib/post'
import { generateRss } from '@/lib/rss'

export const revalidate = 300

export async function GET() {
  const posts = await getAllPostsWithSlug()
  const rss = generateRss(posts.slice(0, 10))

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}
