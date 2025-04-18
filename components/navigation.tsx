'use client'

import Image from "next/image"
import { Search, Bookmark, Landmark, UserRound } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Navigation() {
  const pathname = usePathname()
  const isActive = (path: string) => {
    return pathname === path ? '#ff9501' : '#aeaeae'
  }
  const isActiveSvg = (path: string) => {
    return pathname === path ? 'invert(38%) sepia(100%) saturate(735%) hue-rotate(-8deg)' : 'grayscale(100%)'
  }

  return (
    <>
      <div className='border-t mobile fixed bottom-0 left-0 pt-3 pb-5 bg-background z-100'>
        <div className='w-screen grid grid-cols-5 items-center justify-center'>
          <Link href={'/'}>
            <div className={'flex-1 flex flex-col items-center justify-center'}>
              <Search style={{ color: `${isActive('/')}` }} />
              <p className="text-[12px] pt-1" style={{ color: `${isActive('/')}` }}>Explore</p>
            </div>
          </Link>
          <Link href={'/bookmarks'}>
            <div className={`${isActive('/bookmark')} flex-1 flex flex-col items-center justify-center`}>
              <Bookmark style={{ color: `${isActive('/bookmarks')}` }} />
              <p className="text-[12px] pt-1" style={{ color: `${isActive('/bookmarks')}` }}>Bookmarks</p>
            </div>
          </Link>
          <Link href={'/visits'}>
            <div className={`flex-1 flex flex-col items-center justify-center`}>
              <Landmark style={{ color: `${isActive('/visits')}` }} />
              <p className="text-[12px] pt-1" style={{ color: `${isActive('/visits')}` }}>Visits</p>
            </div>
          </Link>
          <Link href={'/docent'}>
            <div className={`${isActive('/docent')} flex-1 flex flex-col items-center justify-center`}>
              <Image src='/ar.svg' width={30} height={30} alt='ar' style={{ filter: `${isActiveSvg('/docent')}` }} />
              <p className="text-[12px] pt-1" style={{ color: `${isActive('/docent')}` }}>Docent</p>
            </div>
          </Link>
          <Link href={'/profile'}>
            <div className={`${isActive('/profile')} flex-1 flex flex-col items-center justify-center`}>
              <UserRound style={{ color: `${isActive('/profile')}` }} />
              <p className="text-[12px] pt-1" style={{ color: `${isActive('/profile')}` }}>Profile</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}
