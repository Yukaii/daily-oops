import { useRouter } from 'next/router'
import Link from 'next/link'

import { BookIcon, CodeIcon, InfoIcon } from '@primer/octicons-react'

const Header = () => {
  const { pathname } = useRouter()

  const items = [
    {
      text: 'Blog',
      href: '/',
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
      <h1>
        Daily Oops!
      </h1>
    </div>
    <nav className="UnderlineNav flex-justify-center bg-gray px-1">
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
