'use client'

import Link from 'next/link'
import Exhibition from '@/components/exhibition'
import { useState, useEffect } from 'react'
import Navigation from "@/components/navigation"
import { BookDashed } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface props {
  id: number
  name: string
  title: string
  price: number
  imgID: number
  content: string
  bookmark: boolean
  address: string
}

export default function Home() {
  const [exhibitions, setExhibitions] = useState<props[]>([])
  const [updated, setUpdated] = useState<boolean>(false)

  useEffect(() => {

  }, [updated])

  return (
    <>
      <div className="py-4 flex justify-between items-center w-full">
        <p className='text-2xl font-bold'>Bookmarks</p>
      </div>

      {exhibitions.length === 0 &&
        <div className="text-muted-foreground flex flex-col items-center justify-center p-10">
          <BookDashed size={24} className="" />
          <p className="py-2">No Bookmarks</p>
          <Link href={'/'}>
            <Button className="mt-5 p-6 flex items-center" size={"sm"} variant={'default'}>
              <span>Start exploring</span>
            </Button>
          </Link>
        </div>}

      <div>
        {exhibitions.map((exhibition) => (
          <Exhibition key={exhibition.id} json={exhibition} update={setExhibitions} updated={setUpdated} />
        ))}
      </div>
      <Navigation />
    </>
  )
}