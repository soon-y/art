'use client'

import { useState, useEffect, useRef } from 'react'
import Image from "next/image"
import Link from 'next/link'

export default function Header() {
  const [clicked, setClicked] = useState<boolean>(false)
  const profile = useRef<HTMLDivElement>(null)
  const menu = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menu.current && !menu.current.contains(event.target as Node)) {
        setClicked(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <>
      <header className='web header-top pt-6 pb-4 px-6 xl:px-16 lg:px-8 grid grid-cols-[70px_1fr_30px] gap-2 items-center'>
        <Link href={'/'}>
          <Image src='/art.svg' alt='art logo' width={70} height={35} priority />
        </Link>
        <div></div>
        <div className='cursor-pointer bg-cover bg-center w-[100%] rounded-full aspect-[1]' ref={profile}
          style={{ backgroundImage: `url('https://picsum.photos/id/64/300/300')` }} onClick={() => { setClicked(true) }}>
        </div>
      </header>
      {clicked &&
        <div className='web menu bg-white z-100 rounded-xl right-6 xl:right-16 lg:right-8' ref={menu}>
          <ul>
            <Link href={'/'}>
              <li>Explore</li>
            </Link>
            <Link href={'/bookmark'}>
              <li>Bookmarks</li>
            </Link>
            <Link href={'/visit'}>
              <li>Visit</li>
            </Link>
            <Link href={'/profile'}>
              <li>Profile</li>
            </Link>
          </ul>
        </div>}
    </>
  )
}
