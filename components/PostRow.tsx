'use client'

import { DotFillIcon } from '@primer/octicons-react'
import Link from 'next/link'

import dayjs from '@/lib/dayjs'
import {
  AppLocale,
  getDayjsLocale,
  getLocalizedPath,
  getMessages,
} from '@/lib/i18n'
import { PostPreview } from '@/types'

import useReadStatus from '../lib/hooks/useReadStatus'
import styles from './PostRow.module.css'

type PostRowProps = {
  post: PostPreview
  index: number
  locale: AppLocale
  totalCount: number
}

export default function PostRow({
  post,
  index,
  locale,
  totalCount,
}: PostRowProps) {
  const copy = getMessages(locale)
  const {
    date: { year, month, day },
    slug,
  } = post
  const date = dayjs(`${year}-${month}-${day}`)
    .locale(getDayjsLocale(locale))
    .format('LL')

  const fullSlug = `/blog/${year}/${month}/${day}/${slug}`

  const [readStatus, setReadStatus, isLoaded] = useReadStatus(fullSlug)
  const isRead = readStatus || !isLoaded

  const onLinkClick = () => {
    setReadStatus(true)
  }

  return (
    <div className="Box-row Box-row--hover-gray d-flex flex-items-start">
      <div
        className="mt-1 mr-2 d-flex flex-items-start"
        style={{ color: 'var(--color-scale-orange-3)' }}
      >
        {isRead ? (
          <div style={{ width: 16, height: 16 }} />
        ) : (
          <DotFillIcon aria-label={copy.postRow.unreadLabel} />
        )}
      </div>
      <div className="flex-auto">
        <Link
          href={getLocalizedPath(
            `/blog/${year}/${month}/${day}/${slug}`,
            locale,
          )}
          onClick={onLinkClick}
          className={styles.postLink}
        >
          <strong>{post.title}</strong>
        </Link>

        <div className="text-small color-fg-muted">
          {copy.postRow.postedOn(totalCount - index, date)}
        </div>
      </div>
    </div>
  )
}
