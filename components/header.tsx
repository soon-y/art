'use client'

import ArtLogo from '@/components/logo/art-logo'
import { Account } from "@/components/account"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Header() {
  const pathname = usePathname()
  const isActiveBorder = (path: string) => {
    return pathname === path ? 'none' : '1px solid rgba(214, 214, 214, 0.57)'
  }
  useEffect(() => {
    const el = document.getElementsByClassName('mobileHeader')[0] as HTMLElement
    if (el) {
      el.style.opacity = pathname === '/docent/ar' ? '0' : '1'
    }
  }, [pathname])

  return (
    <>
      <header className='web z-10 fixed left-0 bg-background w-screen p-6 lg:px-20 xl:px-28 grid grid-cols-[70px_1fr_40px_40px] gap-2 items-center' style={{
        borderBottom: `${isActiveBorder('/')}`
      }}>
        <Link href={'/'}>
          <ArtLogo />
        </Link>
        <div></div>
        <ThemeSwitcher />
        <Account />
      </header>
      <header className='mobile z-10 fixed left-0 bg-background w-screen h-12 mobileHeader'>
      </header>
    </>
  )
}
