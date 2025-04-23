'use client'

import ArtLogo from '@/components/logo/art-logo'
import { Account } from "@/components/account"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Searchbar from "@/components/searchbar"

type SearchItem = {
  id: number
  address: string
  date?: string
  who: number
}

export default function Header() {
  const pathname = usePathname()
  const [searchData, setSearchData] = useState<SearchItem | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/search/fetch')
      const result = await res.json()
      if (result.success) {
        setSearchData(result.data[0])
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const el0 = document.getElementById('mobileHeader') as HTMLElement
    if (el0) {
      el0.style.opacity = pathname === '/docent/ar' ? '0' : '1'
    }
  }, [pathname])

  return (
    <>
      <header id='mobileHeader' className='mobileHeader md:border-b z-10 fixed left-0 bg-background w-screen p-6 lg:px-20 xl:px-28'>
        <div className='grid grid-cols-[70px_1fr_40px_40px] gap-2 items-center'>
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
        <div>
          {searchData && <Searchbar json={searchData} />}
        </div>
      </header>
    </>
  )
}
