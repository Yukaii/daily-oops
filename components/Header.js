import { useRouter } from 'next/router'
import Link from 'next/link'

import { OctofaceIcon, BookIcon, CodeIcon, InfoIcon } from '@primer/octicons-react'

const Header = () => {
  const { pathname } = useRouter()

  const items = [
    {
      text: 'Home',
      href: '/',
      icon: OctofaceIcon
    },
    {
      text: 'Blog',
      href: '/blog',
      icon: BookIcon
    },
    {
      text: 'Projects',
      href: '/projects',
      icon: CodeIcon
    },
    {
      text: 'About',
      href: '/about',
      icon: InfoIcon
    }
  ]

  return <>
    <div className='d-block text-center bg-gray py-4 px-1'>
      <div className='CircleBadge CircleBadge--large mx-auto mb-3' style={{ overflow: 'hidden', backgroundColor: '#F5CC7F' }}>
        <img src='/logo-animated.gif' alt='Daily Oops' style={{ height: 'auto', maxHeight: '80%' }} className='user-select-none' />
      </div>
      <h1>
        Daily Oops!
      </h1>
    </div>
    <nav className="UnderlineNav flex-justify-center bg-gray px-1 position-sticky top-0" style={{ zIndex: 1 }}>
      <div className="UnderlineNav-body" role="tablist">
        {
          items.map(item => (<Link href={item.href} key={item.href}>
            <button className="UnderlineNav-item" role="tab" type="button" aria-selected={item.href === pathname}>
              {
                item.icon ? <>
                  <item.icon className='UnderlineNav-octicon' />
                  <span>{item.text}</span>
                </>
                : item.text
              }
            </button>
          </Link>))
        }
      </div>
    </nav>
  </>
}

export default Header
