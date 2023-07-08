import { DotFillIcon } from '@primer/octicons-react'
import dayjs from 'lib/dayjs'
import Link from 'next/link'

import useReadStatus from '../lib/hooks/useReadStatus'

export default function PostRow({ post, index, totalCount }) {
  const {
    date: { year, month, day },
    slug,
  } = post
  const date = dayjs(`${year}-${month}-${day}`)

  const fullSlug = `/blog/${year}/${month}/${day}/${slug}`

  const [readStatus, setReadStatus] = useReadStatus(fullSlug)

  const onLinkClick = () => {
    setReadStatus(true)
  }

  return (
    <div className="Box-row Box-row--hover-gray d-flex flex-items-start">
      <div
        className="mr-2 mt-1 d-flex flex-items-start"
        style={{ color: 'var(--color-scale-orange-3)' }}
      >
        {readStatus ? (
          <div style={{ width: 16, height: 16 }} />
        ) : (
          <DotFillIcon />
        )}
      </div>
      <div className="flex-auto">
        <Link
          href={`/blog/${year}/${month}/${day}/${slug}`}
          onClick={onLinkClick}
        >
          <strong>{post.title}</strong>
        </Link>

        <div className="text-small color-fg-muted">
          #{totalCount - index} posted on {date.format('LL')}
        </div>
      </div>
    </div>
  )
}
