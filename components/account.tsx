"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserRound, Bookmark, LogIn, Landmark } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"

const Account = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const ICON_SIZE = 18

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="h-[40px] w-[40px] p-0 cursor-pointer flex items-center justify-center">
          <UserRound size={ICON_SIZE} className="cursor-pointer" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-content mt-4" align="end">
        <DropdownMenuRadioGroup>
          <Link href={'/sign-in'}>
            <DropdownMenuRadioItem className="flex gap-2" value="light">
              <LogIn size={ICON_SIZE} />
              <span>Log in</span>
            </DropdownMenuRadioItem>
          </Link>
          <Link href={'/bookmarks'}>
            <DropdownMenuRadioItem className="flex gap-2" value="system">
              <Bookmark size={ICON_SIZE} />
              <span>Bookmarks</span>
            </DropdownMenuRadioItem>
          </Link>
          <Link href={'/visits'}>
            <DropdownMenuRadioItem className="flex gap-2" value="system">
              <Landmark size={ICON_SIZE} />
              <span>Visits</span>
            </DropdownMenuRadioItem>
          </Link>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { Account }
