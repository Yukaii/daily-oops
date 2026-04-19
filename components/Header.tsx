'use client'

import {
  BookIcon,
  CodeIcon,
  HomeIcon,
  InfoIcon,
  KebabHorizontalIcon,
} from '@primer/octicons-react'
import cx from 'classnames'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import {
  AppLocale,
  getLocalizedPath,
  getMessages,
  stripLocalePrefix,
  switchLocalePath,
} from '@/lib/i18n'

import LogoAnimated from '../public/logo-animated.gif'

const NightSwitch = dynamic(() => import('./NightSwitch'), {
  ssr: false,
})

type HeaderProps = {
  locale: AppLocale
}

const Header = ({ locale }: HeaderProps) => {
  const router = useRouter()
  const pathname = usePathname() ?? '/'
  const currentPath = stripLocalePrefix(pathname)
  const copy = getMessages(locale)
  const nextLocale = locale === 'en' ? 'zh-TW' : 'en'
  const nextLocaleLabel = copy.languageNames[nextLocale]
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const items = [
    {
      baseHref: '/',
      text: copy.nav.home,
      href: getLocalizedPath('/', locale),
      icon: HomeIcon,
    },
    {
      baseHref: '/blog',
      text: copy.nav.blog,
      href: getLocalizedPath('/blog', locale),
      icon: BookIcon,
    },
    {
      baseHref: '/projects',
      text: copy.nav.projects,
      href: getLocalizedPath('/projects', locale),
      icon: CodeIcon,
    },
    {
      baseHref: '/about',
      text: copy.nav.about,
      href: getLocalizedPath('/about', locale),
      icon: InfoIcon,
    },
  ]

  const small = !items.map((item) => item.baseHref).includes(currentPath)

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return
    }

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target

      if (!(target instanceof Node)) {
        return
      }

      if (mobileMenuRef.current?.contains(target)) {
        return
      }

      setIsMobileMenuOpen(false)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false)
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
  }, [isMobileMenuOpen])

  const switchLocale = () => {
    router.push(switchLocalePath(pathname, nextLocale))
  }

  return (
    <>
      <div
        className={cx(
          'd-flex text-center color-bg-subtle py-4 px-3 header-block flex-items-center',
          { small, 'flex-column': !small, 'flex-justify-center': small },
        )}
      >
        <div
          className={cx('CircleBadge user-select-none', {
            'CircleBadge--small': small,
            'CircleBadge--large': !small,
            'mr-2': small,
            'mb-1': !small,
          })}
          style={{ overflow: 'hidden', backgroundColor: '#F5CC7F' }}
        >
          <Image
            src={LogoAnimated}
            alt="Daily Oops"
            style={{ height: 'auto', maxWidth: '90%' }}
          />
        </div>

        <h1 className="d-flex flex-items-center flex-justify-center">
          Daily Oops!
        </h1>
      </div>

      <nav
        className="UnderlineNav site-header-nav color-bg-subtle px-3 position-sticky top-0"
        style={{ zIndex: 99 }}
      >
        <div className="site-nav">
          <div
            className="UnderlineNav-body site-nav-tabs"
            role="tablist"
            style={{ maxWidth: '100%' }}
          >
            {items.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className={cx('UnderlineNav-item', {
                  selected: item.baseHref === currentPath,
                })}
              >
                {item.icon ? (
                  <>
                    <item.icon className="UnderlineNav-octicon" />
                    <span>{item.text}</span>
                  </>
                ) : (
                  item.text
                )}
              </Link>
            ))}
          </div>

          <div className="site-mobile-menu" ref={mobileMenuRef}>
            <button
              type="button"
              className={cx('UnderlineNav-item site-mobile-menu-trigger', {
                selected: isMobileMenuOpen,
              })}
              aria-expanded={isMobileMenuOpen}
              aria-haspopup="menu"
              aria-controls="site-mobile-menu-panel"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              <KebabHorizontalIcon className="UnderlineNav-octicon" />
              <span>{copy.nav.more}</span>
            </button>

            {isMobileMenuOpen ? (
              <div
                className="site-mobile-menu-panel"
                id="site-mobile-menu-panel"
                role="menu"
                aria-label={copy.nav.more}
              >
                <button
                  type="button"
                  className="site-mobile-menu-item"
                  role="menuitem"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    switchLocale()
                  }}
                >
                  <span className="site-mobile-menu-item-label">
                    {copy.languageSwitch}
                  </span>
                  <span className="site-mobile-menu-item-value">
                    {nextLocaleLabel}
                  </span>
                </button>

                <NightSwitch
                  label={copy.themeToggle}
                  className="site-mobile-menu-item"
                  role="menuitem"
                  showText
                  onPress={() => setIsMobileMenuOpen(false)}
                />
              </div>
            ) : null}
          </div>
        </div>
      </nav>

      <button
        type="button"
        className="btn btn-sm site-chrome-button site-chrome-button-left"
        aria-label={copy.languageSwitch}
        title={copy.languageSwitch}
        onClick={switchLocale}
      >
        {nextLocaleLabel}
      </button>

      <div className="site-chrome-button site-chrome-button-right">
        <NightSwitch label={copy.themeToggle} />
      </div>
    </>
  )
}

export default Header
