'use client'

import Link from 'next/link'
import Exhibition from '@/components/exhibition'
import { useState, useEffect } from 'react'
import Navigation from "@/components/navigation"
import { BookDashed } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface ExhibitionData {
  id: number
  name: string
  title: string
  price: number
  imgid: number
  content: string
  bookmark: boolean
  address: string
}

export default function Bookmark({ initialData }: { initialData: ExhibitionData[] }) {
  return (
    <>
      <div className="py-4 flex justify-between items-center w-full">
        <h1 className='text-2xl font-bold'>Bookmarks</h1>
      </div>

      {initialData.length === 0 &&
        <div className="text-muted-foreground flex flex-col items-center justify-center p-10">
          <BookDashed size={24} className="" />
          <p className="py-2">No Bookmarks</p>
          <Link href={'/'}>
            <Button className="mt-5 p-6 flex items-center" size={"sm"} variant={'default'}>
              <span>Start exploring</span>
            </Button>
          </Link>
        </div>}

      <div className='exhibition mb-20 md:mb-0 py-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-8'>
        {initialData.map((exhibition) => (
          <Exhibition key={exhibition.id} json={exhibition} />
        ))}
      </div>
      <Navigation />
    </>
  )
}