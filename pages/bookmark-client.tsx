'use client'

import Link from 'next/link'
import Exhibition from '@/components/exhibition'
import Navigation from "@/components/navigation"
import { BookDashed } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useState, useEffect } from 'react'
import { ExhibitionData } from "@/types"
import Alert from "@/components/alert"

export default function Bookmark() {
  const [error, setError] = useState<boolean>(false)
  const [data, setData] = useState<ExhibitionData[] | null>(null)

  const fetchData = async () => {
    const res = await fetch('/api/bookmark/fetch')
    const result = await res.json()
    if (result.success) {
      setData(result.exhibitions)
    } else {
      setError(true)
      setTimeout(() => setError(false), 3000)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <div className="py-4 flex justify-between items-center w-full">
        <h1 className='text-2xl font-bold'>Bookmarks</h1>
      </div>

      {data !== null ?

        <>
          {data.length === 0 &&
            <div className="text-muted-foreground flex flex-col items-center justify-center p-10">
              <BookDashed size={24} className="" />
              <p className="py-2">No Bookmarks</p>
              <Link href={'/'}>
                <Button className="mt-5 p-6 flex items-center" size={"sm"} variant={'default'}>
                  <span>Start exploring</span>
                </Button>
              </Link>
            </div>}

          <div className='exhibition mb-28 md:mb-10 py-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-8'>
            {data.map((exhibition) => (
              <Exhibition key={exhibition.id} json={exhibition} />
            ))}
          </div>
        </>
        :
        <div className='exhibition mb-28 md:mb-10 py-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-8'>
          {Array.from({ length: 20 }).map((_, i) => (
            <div className='w-full relative' key={i}>
              <div className='bg-gray-100 w-[100%] rounded-2xl aspect-[1] animate-pulse'>
              </div>
              <div className="animate-pulse bg-gray-100 w-full h-7 rounded-lg mt-3"></div>
              <div className="animate-pulse bg-gray-100 w-full h-4 rounded-lg mt-2"></div>
              <div className="animate-pulse bg-gray-100 w-full h-4 rounded-lg mt-2"></div>
              <div className="animate-pulse bg-gray-100 w-full h-4 rounded-lg mt-2"></div>
              <div className="animate-pulse bg-gray-100 w-[50%] h-4 rounded-lg mt-2"></div>
            </div >
          ))}
        </div>
      }

      <Navigation />

      {error && <Alert msg={
        <>
          Something went wrong.<br />
          Please try again.
        </>
      } />}
    </>
  )
}