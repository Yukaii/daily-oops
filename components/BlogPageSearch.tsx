'use client'

import Fuse from 'fuse.js/basic'
import { useDeferredValue, useMemo, useState } from 'react'

import { AppLocale, getMessages } from '@/lib/i18n'
import { SearchablePostPreview } from '@/types'

import styles from './BlogPageSearch.module.css'
import PostRow from './PostRow'

type BlogPageSearchProps = {
  locale: AppLocale
  posts: SearchablePostPreview[]
}

const createFuse = (posts: SearchablePostPreview[]) => {
  return new Fuse(posts, {
    ignoreLocation: true,
    minMatchCharLength: 1,
    threshold: 0.35,
    keys: [
      { name: 'title', weight: 0.55 },
      { name: 'searchText', weight: 0.3 },
      { name: 'tags', weight: 0.15 },
    ],
  })
}

export default function BlogPageSearch({ locale, posts }: BlogPageSearchProps) {
  const copy = getMessages(locale)
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query.trim())
  const fuse = useMemo(() => createFuse(posts), [posts])
  const postIndexes = useMemo(
    () => new Map(posts.map((post, index) => [post.id, index])),
    [posts],
  )

  const visiblePosts =
    deferredQuery === ''
      ? posts
      : fuse.search(deferredQuery).map((result) => result.item)

  return (
    <>
      <div className={styles.desktopOnly}>
        <input
          data-blog-search-input="true"
          type="search"
          className={`form-control ${styles.searchInput}`}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={copy.siteSearch.placeholder}
          aria-label={copy.siteSearch.placeholder}
          autoComplete="off"
        />
      </div>

      <div className="Box">
        {visiblePosts.map((post, index) => (
          <PostRow
            post={post}
            index={postIndexes.get(post.id) ?? index}
            key={post.id}
            locale={locale}
            totalCount={posts.length}
          />
        ))}
      </div>
    </>
  )
}
