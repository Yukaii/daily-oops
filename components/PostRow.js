import { NorthStarIcon } from '@primer/octicons-react'
import dayjs from 'lib/dayjs'
import Link from 'next/link'

export default function PostRow({ post, index, totalCount }) {
  const {
    date: { year, month, day },
    slug,
  } = post
  const date = dayjs(`${year}-${month}-${day}`)

  return (
    <div className="Box-row Box-row--hover-gray d-flex flex-items-start">
      <div
        className="mr-2 mt-1 d-flex flex-items-start"
        style={{ color: 'var(--color-scale-red-2 )' }}
      >
        <NorthStarIcon />
      </div>
      <div className="flex-auto">
        <Link href={`/blog/${year}/${month}/${day}/${slug}`}>
          <strong>{post.title}</strong>
        </Link>

        <div className="text-small color-text-secondary">
          #{totalCount - index} posted on {date.format('LL')}
        </div>
      </div>
    </div>
  )
}
