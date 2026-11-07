'use client'

import { SearchIcon } from '@primer/octicons-react'
import Fuse from 'fuse.js/basic'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  useDeferredValue,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'

import type { AppLocale } from '@/lib/i18n'
import { getMessages } from '@/lib/i18n'
import { OPEN_SITE_SEARCH_EVENT } from '@/lib/keyboardShortcuts'
import type { SearchIndexItem } from '@/lib/search'

import styles from './SiteSearch.module.css'

type SearchVariant = 'nav-desktop' | 'nav-mobile'

type SiteSearchProps = {
  locale: AppLocale
  variant: SearchVariant
}

const MAX_RESULTS = 6

const createFuse = (items: SearchIndexItem[]) => {
  return new Fuse(items, {
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

export default function SiteSearch({ locale, variant }: SiteSearchProps) {
  const router = useRouter()
  const copy = getMessages(locale)
  const pathname = usePathname()
  const inputId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query.trim())

  const [items, setItems] = useState<SearchIndexItem[] | null>(null)
  const [isIndexLoading, setIsIndexLoading] = useState(false)

  const fuse = useMemo(() => (items ? createFuse(items) : null), [items])
  const isDesktop = variant === 'nav-desktop'

  // Fetch the prebuilt search index lazily so every page's RSC payload
  // doesn't embed all post previews.
  useEffect(() => {
    if (!isOpen || items !== null || isIndexLoading) {
      return
    }

    let cancelled = false
    setIsIndexLoading(true)

    fetch(`/api/search-index?locale=${locale}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Search index request failed: ${response.status}`)
        }

        return response.json() as Promise<SearchIndexItem[]>
      })
      .then((indexItems) => {
        if (!cancelled) {
          setItems(indexItems)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setItems([])
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsIndexLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [isOpen, items, isIndexLoading, locale])

  useEffect(() => {
    setIsOpen(false)
    setQuery('')
  }, [pathname])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    inputRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target

      if (!(target instanceof Node)) {
        return
      }

      if (rootRef.current?.contains(target)) {
        return
      }

      setIsOpen(false)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  useEffect(() => {
    const handleOpenSearch = () => {
      const shouldOpenDesktop =
        variant === 'nav-desktop' && window.innerWidth >= 769
      const shouldOpenMobile =
        variant === 'nav-mobile' && window.innerWidth < 769

      if (!shouldOpenDesktop && !shouldOpenMobile) {
        return
      }

      setIsOpen(true)
    }

    document.addEventListener(OPEN_SITE_SEARCH_EVENT, handleOpenSearch)

    return () => {
      document.removeEventListener(OPEN_SITE_SEARCH_EVENT, handleOpenSearch)
    }
  }, [variant])

  const results =
    deferredQuery === '' || !fuse
      ? []
      : fuse
          .search(deferredQuery)
          .slice(0, MAX_RESULTS)
          .map((result) => result.item)

  const resultsClassName = isDesktop
    ? styles.results
    : `${styles.results} ${styles.mobileResults}`

  return (
    <div
      className={isDesktop ? styles.desktopRoot : styles.mobileRoot}
      ref={rootRef}
    >
      {isDesktop ? (
        <button
          type="button"
          className={`btn btn-sm ${styles.desktopButton}`}
          onClick={() => setIsOpen((open) => !open)}
          aria-label={copy.siteSearch.open}
          title={copy.siteSearch.open}
          aria-expanded={isOpen}
          aria-controls={`${inputId}-results`}
        >
          <SearchIcon />
        </button>
      ) : !isOpen ? (
        <button
          type="button"
          className={`btn btn-sm ${styles.mobileButton}`}
          onClick={() => setIsOpen(true)}
          aria-label={copy.siteSearch.open}
          title={copy.siteSearch.open}
          aria-expanded={isOpen}
          aria-controls={`${inputId}-results`}
        >
          <SearchIcon />
        </button>
      ) : null}

      {isOpen ? (
        <>
          {isDesktop ? (
            <div className={styles.desktopPanel}>
              <form
                role="search"
                onSubmit={(event) => {
                  event.preventDefault()

                  if (results[0]) {
                    router.push(results[0].href)
                  }
                }}
              >
                <input
                  ref={inputRef}
                  id={inputId}
                  data-site-search-input="true"
                  type="search"
                  className={`form-control ${styles.searchInput}`}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={copy.siteSearch.placeholder}
                  aria-label={copy.siteSearch.placeholder}
                  autoComplete="off"
                />
              </form>

              {deferredQuery !== '' ? (
                <div className={styles.results} id={`${inputId}-results`}>
                  <SearchResults
                    emptyLabel={copy.siteSearch.empty(deferredQuery)}
                    loadingLabel={copy.siteSearch.loading}
                    isLoading={isIndexLoading || items === null}
                    pageLabel={copy.siteSearch.pageLabel}
                    postLabel={copy.siteSearch.postLabel}
                    results={results}
                    onNavigate={() => {
                      setIsOpen(false)
                      setQuery('')
                    }}
                  />
                </div>
              ) : null}
            </div>
          ) : (
            <>
              <form
                className={styles.mobileInline}
                role="search"
                onSubmit={(event) => {
                  event.preventDefault()

                  if (results[0]) {
                    router.push(results[0].href)
                  }
                }}
              >
                <input
                  ref={inputRef}
                  id={inputId}
                  data-site-search-input="true"
                  type="search"
                  className={`form-control ${styles.searchInput}`}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={copy.siteSearch.placeholder}
                  aria-label={copy.siteSearch.placeholder}
                  autoComplete="off"
                />
              </form>

              {deferredQuery !== '' ? (
                <div className={resultsClassName} id={`${inputId}-results`}>
                  <SearchResults
                    emptyLabel={copy.siteSearch.empty(deferredQuery)}
                    loadingLabel={copy.siteSearch.loading}
                    isLoading={isIndexLoading || items === null}
                    pageLabel={copy.siteSearch.pageLabel}
                    postLabel={copy.siteSearch.postLabel}
                    results={results}
                    onNavigate={() => {
                      setIsOpen(false)
                      setQuery('')
                    }}
                  />
                </div>
              ) : null}
            </>
          )}
        </>
      ) : null}
    </div>
  )
}

function SearchResults({
  emptyLabel,
  loadingLabel,
  isLoading,
  onNavigate,
  pageLabel,
  postLabel,
  results,
}: {
  emptyLabel: string
  loadingLabel: string
  isLoading: boolean
  onNavigate: () => void
  pageLabel: string
  postLabel: string
  results: SearchIndexItem[]
}) {
  if (isLoading) {
    return <div className={styles.emptyState}>{loadingLabel}</div>
  }

  if (results.length === 0) {
    return <div className={styles.emptyState}>{emptyLabel}</div>
  }

  return (
    <ul className={styles.resultsList}>
      {results.map((item) => (
        <li key={item.id}>
          <Link
            href={item.href}
            className={styles.resultLink}
            onClick={onNavigate}
          >
            <span className={styles.resultMeta}>
              {item.kind === 'page' ? pageLabel : `${postLabel} ${item.meta}`}
            </span>
            <span className={styles.resultTitle}>{item.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
