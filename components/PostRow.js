import dayjs from 'lib/dayjs'
import Link from 'next/link'

export default function PostRow ({ post, index, totalCount }) {
  const { date: { year, month, day }, slug } = post
  const date = dayjs(`${year}-${month}-${day}`)

  return <div className="Box-row Box-row--hover-gray d-flex flex-items-center">
    <div className="flex-auto">
      <Link href={`/blog/${year}/${month}/${day}/${slug}`}>
        <a>
          <strong>{post.title}</strong>
        </a>
      </Link>

      <div className="text-small text-gray-light">
        #{totalCount - index} posted on { date.format('LL') }
      </div>
    </div>
  </div>
}
