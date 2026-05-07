'use client'

import { DotFillIcon } from '@primer/octicons-react'
import Link from 'next/link'
import { useRef } from 'react'

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
  const href = getLocalizedPath(fullSlug, locale)

  const [readStatus, setReadStatus, isLoaded] = useReadStatus(fullSlug)
  const isRead = readStatus || !isLoaded

  const linkRef = useRef<HTMLAnchorElement>(null)

  const onLinkClick = () => {
    setReadStatus(true)
  }

  const handleRowClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking the link directly (let Link handle it)
    if (e.target instanceof HTMLElement && e.target.closest('a')) {
      return
    }
    linkRef.current?.click()
  }

  const handleRowKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      linkRef.current?.click()
    }
  }

  return (
    <div
      className={`Box-row Box-row--hover-gray d-flex flex-items-start ${styles.postRow}`}
      data-post-link="true"
      tabIndex={0}
      onClick={handleRowClick}
      onKeyDown={handleRowKeyDown}
      aria-keyshortcuts="Enter l"
      role="link"
    >
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
          ref={linkRef}
          href={href}
          onClick={onLinkClick}
          className={styles.postLink}
          tabIndex={-1}
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
