'use client'

import ArtLogo from '@/components/logo/art-logo'
import { Account } from "@/components/account"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useEffect } from 'react'
import Searchbar from "@/components/searchbar"

export default function Header() {
  const pathname = usePathname()
  useEffect(() => {
    const el0 = document.getElementsByClassName('mobileHeader')[0] as HTMLElement
    const el1 = document.getElementsByClassName('mobileHeader')[1] as HTMLElement
    if (el0 && el1) {
      el0.style.opacity = pathname === '/docent/ar' ? '0' : '1'
      el1.style.opacity = pathname === '/docent/ar' ? '0' : '1'
    }
  }, [pathname])

  return (
    <>
      <header className='md:border-b z-10 fixed left-0 bg-background w-screen p-6 lg:px-20 xl:px-28 grid grid-cols-[70px_1fr_40px_40px] gap-2 items-start mobileHeader'>
        <Link href={'/'} className='hidden md:block'>
          <ArtLogo />
        </Link>
        <div>
          <div>
            <Searchbar />
          </div>
        </div>
        <span className='hidden md:block'>
          <ThemeSwitcher />
        </span>
        <span className='hidden md:block'>
          <Account />
        </span>
      </header>
      <header className='mobile z-10 fixed left-0 bg-background w-screen h-12 mobileHeader'>
      </header>
    </>
  )
}
