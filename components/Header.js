import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

import NightSwitch from 'components/NightSwitch'

import { OctofaceIcon, BookIcon, CodeIcon, InfoIcon } from '@primer/octicons-react'

const Header = ({ small = false }) => {
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
    <div className='d-block text-center color-bg-secondary py-4 px-3'>
      {
        !small && <div className='CircleBadge CircleBadge--large mx-auto mb-3' style={{ overflow: 'hidden', backgroundColor: '#F5CC7F' }}>
          <div style={{ height: 'auto', maxHeight: '80%', maxWidth: '80%' }} className='user-select-none'>
            <Image src='/logo-animated.gif' alt='Daily Oops' width={300} height={300} />
          </div>
        </div>
      }
      
      <h1 className='d-flex flex-items-center flex-justify-center'>
        {
          small && <>
            <Image src='/logo-animated.gif' alt='Daily Oops' width={50} height={50} className='circle' />
            &nbsp;
          </>
        }
        Daily Oops!
      </h1>
    </div>

    <nav className='UnderlineNav color-bg-secondary px-3 position-sticky top-0 flex-items-center flex-justify-center' style={{ zIndex: 99 }}>
      <NightSwitch />
  
      <div className="UnderlineNav-body" role="tablist" style={{ maxWidth: '100%' }}>
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
