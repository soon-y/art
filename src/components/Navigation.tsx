'use client'

import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookmark, faUser } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass, faPersonShelter } from '@fortawesome/free-solid-svg-icons'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Navigation() {
  const pathname = usePathname()
  const isActive = (path: string) => {
    return pathname === path ? 'var(--main)' : 'var(--deactivate)'
  }
  const isActive2 = (path: string) => {
    return pathname === path ? 'invert(38%) sepia(100%) saturate(735%) hue-rotate(-8deg)' : 'grayscale(100%)'
  }

  return (
    <div className='mobile nav-bar pt-3 pb-8'>
      <div className='grid grid-cols-5 items-center justify-center'>
        <Link href={'/'}>
          <div className={'flex-1 flex flex-col items-center justify-center'}>
            <FontAwesomeIcon className='nav-icon' icon={faMagnifyingGlass} style={{ color: `${isActive('/')}` }}/>
            <p style={{ color: `${isActive('/')}` }}>Explore</p>
          </div>
        </Link>
        <Link href={'/bookmark'}>
          <div className={`${isActive('/bookmark')} flex-1 flex flex-col items-center justify-center`}>
            <FontAwesomeIcon className='nav-icon' icon={faBookmark} style={{ color: `${isActive('/bookmark')}` }}/>
            <p style={{ color: `${isActive('/bookmark')}` }}>Bookmarks</p>
          </div>
        </Link>
        <Link href={'/visit'}>
          <div className={`flex-1 flex flex-col items-center justify-center`}>
            <FontAwesomeIcon className='nav-icon' icon={faPersonShelter} style={{ color: `${isActive('/visit')}` }}/>
            <p style={{ color: `${isActive('/visit')}` }}>Visits</p>
          </div>
        </Link>
        <Link href={'/docent'}>
          <div className={`${isActive('/docent')} flex-1 flex flex-col items-center justify-center`} style={{ color: 'red'}} >
            <Image src='/ar.svg' width={30} height={23.3} alt='ar' style={{ filter: `${isActive2('/docent')}` }} />
            <p style={{ color: `${isActive('/docent')}` }}>Docent</p>
          </div>
        </Link>
        <Link href={'/profile'}>
          <div className={`${isActive('/profile')} flex-1 flex flex-col items-center justify-center`}>
            <FontAwesomeIcon className='nav-icon' icon={faUser} style={{ color: `${isActive('/profile')}` }}/>
            <p style={{ color: `${isActive('/profile')}` }}>Profile</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
