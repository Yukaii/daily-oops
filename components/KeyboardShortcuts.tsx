'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { getMessages } from '@/lib/i18n'
import { AppLocale, getLocalizedPath, stripLocalePrefix } from '@/lib/i18n'
import { OPEN_SHORTCUTS_HELP_EVENT } from '@/lib/keyboardShortcuts'

import styles from './KeyboardShortcuts.module.css'

type KeyboardShortcutsProps = {
  locale: AppLocale
}

const POST_LINK_SELECTOR = '[data-post-link="true"]'
const SEQUENCE_TIMEOUT_MS = 1250

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  if (target.isContentEditable) {
    return true
  }

  const tagName = target.tagName.toLowerCase()

  if (tagName === 'input' || tagName === 'select' || tagName === 'textarea') {
    return true
  }

  return target.closest('[contenteditable="true"], [role="textbox"]') !== null
}

function getPostLinks(): HTMLAnchorElement[] {
  return Array.from(
    document.querySelectorAll<HTMLAnchorElement>(POST_LINK_SELECTOR),
  )
}

function getActivePostLink(): HTMLAnchorElement | null {
  if (!(document.activeElement instanceof HTMLAnchorElement)) {
    return null
  }

  return document.activeElement.matches(POST_LINK_SELECTOR)
    ? document.activeElement
    : null
}

export default function KeyboardShortcuts({ locale }: KeyboardShortcutsProps) {
  const router = useRouter()
  const pathname = usePathname() ?? '/'
  const copy = getMessages(locale)
  const titleId = useId()
  const descriptionId = useId()
  const sequenceRef = useRef('')
  const timeoutRef = useRef<number | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const [isHelpOpen, setIsHelpOpen] = useState(false)

  useEffect(() => {
    if (!isHelpOpen) {
      return
    }

    const { body } = document
    const previousOverflow = body.style.overflow

    body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      body.style.overflow = previousOverflow
      previousFocusRef.current?.focus()
    }
  }, [isHelpOpen])

  useEffect(() => {
    const clearSequence = () => {
      sequenceRef.current = ''

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }

    const setSequence = (value: string) => {
      clearSequence()
      sequenceRef.current = value
      timeoutRef.current = window.setTimeout(clearSequence, SEQUENCE_TIMEOUT_MS)
    }

    const navigateTo = (path: string) => {
      clearSequence()
      router.push(getLocalizedPath(path, locale))
    }

    const openHelp = () => {
      clearSequence()
      previousFocusRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null
      setIsHelpOpen(true)
    }

    const closeHelp = () => {
      clearSequence()
      setIsHelpOpen(false)
    }

    const focusPostLink = (direction: 'next' | 'previous') => {
      const currentPath = stripLocalePrefix(pathname)

      if (currentPath !== '/' && currentPath !== '/blog') {
        return false
      }

      const links = getPostLinks()

      if (links.length === 0) {
        return false
      }

      const activeLink = getActivePostLink()
      const activeIndex = activeLink ? links.indexOf(activeLink) : -1

      let nextIndex = 0

      if (activeIndex === -1) {
        nextIndex = direction === 'next' ? 0 : links.length - 1
      } else if (direction === 'next') {
        nextIndex = Math.min(activeIndex + 1, links.length - 1)
      } else {
        nextIndex = Math.max(activeIndex - 1, 0)
      }

      const target = links[nextIndex]
      target.focus()
      target.scrollIntoView({ block: 'nearest' })
      return true
    }

    const openPostLink = () => {
      const currentPath = stripLocalePrefix(pathname)

      if (currentPath !== '/' && currentPath !== '/blog') {
        return false
      }

      const activeLink = getActivePostLink()

      if (!activeLink) {
        return false
      }

      activeLink.click()
      return true
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isHelpOpen) {
        if (event.key === 'Escape' || event.key === '?') {
          event.preventDefault()
          closeHelp()
        }

        return
      }

      if (
        event.defaultPrevented ||
        event.isComposing ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      ) {
        clearSequence()
        return
      }

      if (isTypingTarget(event.target)) {
        clearSequence()
        return
      }

      if (event.repeat && event.key !== 'j' && event.key !== 'k') {
        return
      }

      if (sequenceRef.current === 'g') {
        switch (event.key) {
          case 'h':
            event.preventDefault()
            navigateTo('/')
            return
          case 'p':
            event.preventDefault()
            navigateTo('/blog')
            return
          case 'P':
            event.preventDefault()
            navigateTo('/projects')
            return
          case 'a':
            event.preventDefault()
            navigateTo('/about')
            return
          default:
            clearSequence()
        }
      }

      switch (event.key) {
        case '?':
          event.preventDefault()
          openHelp()
          return
        case 'g':
          setSequence('g')
          return
        case 'j':
          if (focusPostLink('next')) {
            event.preventDefault()
          }
          return
        case 'k':
          if (focusPostLink('previous')) {
            event.preventDefault()
          }
          return
        case 'l':
          if (openPostLink()) {
            event.preventDefault()
          }
          return
        case 'h':
        case 'Backspace':
          clearSequence()
          event.preventDefault()
          router.back()
          return
        default:
          clearSequence()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      clearSequence()
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isHelpOpen, locale, pathname, router])

  useEffect(() => {
    const handleOpenHelp = () => {
      previousFocusRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null
      setIsHelpOpen(true)
    }

    document.addEventListener(OPEN_SHORTCUTS_HELP_EVENT, handleOpenHelp)

    return () => {
      document.removeEventListener(OPEN_SHORTCUTS_HELP_EVENT, handleOpenHelp)
    }
  }, [])

  const closeHelpModal = () => {
    setIsHelpOpen(false)
  }

  return (
    <>
      {isHelpOpen
        ? createPortal(
            <div
              className={styles.backdrop}
              role="presentation"
              onClick={(event) => {
                if (event.target === event.currentTarget) {
                  closeHelpModal()
                }
              }}
            >
              <div
                aria-describedby={descriptionId}
                aria-labelledby={titleId}
                aria-modal="true"
                className={styles.dialog}
                role="dialog"
              >
                <div className={styles.header}>
                  <div className={styles.headerCopy}>
                    <h2 className={styles.headerTitle} id={titleId}>
                      {copy.shortcuts.title}
                    </h2>
                    <p className={styles.headerDescription} id={descriptionId}>
                      {copy.shortcuts.description}
                    </p>
                  </div>

                  <button
                    ref={closeButtonRef}
                    type="button"
                    className="btn btn-sm"
                    aria-label={copy.shortcuts.closeHelp}
                    onClick={closeHelpModal}
                  >
                    Esc
                  </button>
                </div>

                <div className={styles.body}>
                  <section
                    className={styles.section}
                    aria-labelledby={`${titleId}-nav`}
                  >
                    <h3 className={styles.sectionTitle} id={`${titleId}-nav`}>
                      {copy.shortcuts.navigationSection}
                    </h3>
                    <table className={styles.table}>
                      <tbody>
                        <tr>
                          <th scope="row">
                            <span className={styles.kbd}>g h</span>
                          </th>
                          <td>{copy.shortcuts.goHome}</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <span className={styles.kbd}>g p</span>
                          </th>
                          <td>{copy.shortcuts.goPosts}</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <span className={styles.kbd}>g P</span>
                          </th>
                          <td>{copy.shortcuts.goProjects}</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <span className={styles.kbd}>g a</span>
                          </th>
                          <td>{copy.shortcuts.goAbout}</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <span className={styles.kbd}>?</span>
                          </th>
                          <td>{copy.shortcuts.openHelp}</td>
                        </tr>
                      </tbody>
                    </table>
                  </section>

                  <section
                    className={styles.section}
                    aria-labelledby={`${titleId}-posts`}
                  >
                    <h3 className={styles.sectionTitle} id={`${titleId}-posts`}>
                      {copy.shortcuts.postsSection}
                    </h3>
                    <table className={styles.table}>
                      <tbody>
                        <tr>
                          <th scope="row">
                            <span className={styles.kbd}>j</span>
                          </th>
                          <td>{copy.shortcuts.focusNextPost}</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <span className={styles.kbd}>k</span>
                          </th>
                          <td>{copy.shortcuts.focusPreviousPost}</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <span className={styles.kbd}>l / Enter</span>
                          </th>
                          <td>{copy.shortcuts.openFocusedPost}</td>
                        </tr>
                      </tbody>
                    </table>
                  </section>

                  <section
                    className={styles.section}
                    aria-labelledby={`${titleId}-history`}
                  >
                    <h3
                      className={styles.sectionTitle}
                      id={`${titleId}-history`}
                    >
                      {copy.shortcuts.historySection}
                    </h3>
                    <table className={styles.table}>
                      <tbody>
                        <tr>
                          <th scope="row">
                            <span className={styles.kbd}>h / ⌫</span>
                          </th>
                          <td>{copy.shortcuts.goBack}</td>
                        </tr>
                      </tbody>
                    </table>
                  </section>

                  <p className={styles.note}>{copy.shortcuts.scopeNote}</p>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  )
}
