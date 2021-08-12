import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  SquirrelIcon,
  BookIcon,
  RepoIcon,
  PersonIcon,
} from '@primer/octicons-react'
import cx from 'classnames'

import NightSwitch from 'components/NightSwitch'

const Header = () => {
  const { pathname } = useRouter()

  const items = [
    {
      text: 'Home',
      href: '/',
      icon: SquirrelIcon,
    },
    {
      text: 'Blog',
      href: '/blog',
      icon: BookIcon,
    },
    {
      text: 'Projects',
      href: '/projects',
      icon: RepoIcon,
    },
    {
      text: 'About',
      href: '/about',
      icon: PersonIcon,
    },
  ]

  const small = !items.map((i) => i.href).includes(pathname)

  return (
    <>
      <div
        className={cx(
          'd-flex text-center color-bg-secondary py-4 px-3 header-block flex-items-center',
          { small, 'flex-column': !small, 'flex-justify-center': small }
        )}
      >
        <div
          className={cx('CircleBadge user-select-none', {
            'CircleBadge--small': small,
            'CircleBadge--large': !small,
            'mr-1': small,
            'mb-1': !small,
          })}
          style={{ overflow: 'hidden', backgroundColor: '#F5CC7F' }}
        >
          <img
            src="/logo-animated.gif"
            alt="Daily Oops"
            style={{ height: 'auto', maxWidth: '90%' }}
          />
        </div>

        <h1 className="d-flex flex-items-center flex-justify-center">
          Daily Oops!
        </h1>
      </div>

      <nav
        className="UnderlineNav color-bg-secondary px-3 position-sticky top-0 flex-items-center flex-justify-center"
        style={{ zIndex: 99 }}
      >
        <div
          className="UnderlineNav-body"
          role="tablist"
          style={{ maxWidth: '100%' }}
        >
          {items.map((item) => (
            <Link href={item.href} key={item.href}>
              <button
                className="UnderlineNav-item"
                role="tab"
                type="button"
                aria-selected={item.href === pathname}
              >
                {item.icon ? (
                  <>
                    <item.icon className="UnderlineNav-octicon" />
                    <span>{item.text}</span>
                  </>
                ) : (
                  item.text
                )}
              </button>
            </Link>
          ))}
        </div>
        <NightSwitch />
      </nav>
    </>
  )
}

export default Header
