import { BookIcon, CodeIcon, HomeIcon, InfoIcon } from '@primer/octicons-react'
import cx from 'classnames'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import LogoAnimated from '../public/logo-animated.gif'

const NightSwitch = dynamic(() => import('./NightSwitch'), {
  ssr: false,
})

const Header = () => {
  const { pathname } = useRouter()

  const items = [
    {
      text: 'Home',
      href: '/',
      icon: HomeIcon,
    },
    {
      text: 'Blog',
      href: '/blog',
      icon: BookIcon,
    },
    {
      text: 'Projects',
      href: '/projects',
      icon: CodeIcon,
    },
    {
      text: 'About',
      href: '/about',
      icon: InfoIcon,
    },
  ]

  const small = !items.map((i) => i.href).includes(pathname)

  return (
    <>
      <div
        className={cx(
          'd-flex text-center color-bg-subtle py-4 px-3 header-block flex-items-center',
          { small, 'flex-column': !small, 'flex-justify-center': small }
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
        className="UnderlineNav color-bg-subtle px-3 position-sticky top-0 flex-items-center flex-justify-center"
        style={{ zIndex: 99 }}
      >
        <div
          className="UnderlineNav-body"
          role="tablist"
          style={{ maxWidth: '100%' }}
        >
          {items.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              className={cx('UnderlineNav-item', {
                selected: item.href === pathname,
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

        <NightSwitch />
      </nav>
    </>
  )
}

export default Header
