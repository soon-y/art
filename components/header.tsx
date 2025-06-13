'use client'

import ArtLogo from '@/components/logo/art-logo'
import { Account } from "@/components/account"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { usePathname, useParams } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function Header() {
  const mobileHeader = useRef<HTMLDivElement>(null)
  const searchbar = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const params = useParams()
  const id = params?.id
  const [isDesktop, setIsDesktop] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsDesktop(width >= 768 ? true : false)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (mobileHeader.current) {
      mobileHeader.current.style.opacity = (pathname === `/bookmarks/${id}` || pathname === `/visits/booking/${id}` || pathname === `/${id}` || pathname === '/docent/ar') && !isDesktop ? '0' : '1'
    }
    if (searchbar.current) {
      searchbar.current.style.display = pathname === '/' ? 'block' : 'none'
    }
  }, [pathname, isDesktop])

  return (
    <>
      <header ref={mobileHeader} className='md:border-b z-10 fixed left-0 bg-background w-screen p-6 lg:px-20 xl:px-28'>
        <div className='h-[30x] grid grid-cols-[70px_1fr_40px_40px] gap-2 items-center'>
          <Link href={'/'} className='hidden md:block'>
            <ArtLogo />
          </Link>
          <p className='hidden md:block text-center text-sm font-semibold'>Bringing Augmented Reality to Every hand</p>
          <span className='hidden md:block'>
            <ThemeSwitcher />
          </span>
          <span className='hidden md:block'>
            <Account />
          </span>
        </div>
        <div ref={searchbar} className='w-full h-[72px]'></div>
      </header>
    </>
  )
}
