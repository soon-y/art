'use client'

import Link from 'next/link'
import Exhibition from '@/components/Exhibition'
import { useState, useEffect } from 'react'

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
    fetch('/api/bookmark')
      .then((res) => res.json())
      .then((data) => setExhibitions(data))
      .catch((error) => console.error('Error fetching exhibitions:', error))
  }, [])

  useEffect(() => {
    fetch('/api/bookmark')
      .then((res) => res.json())
      .then((data) => setExhibitions(data))
      .catch((error) => console.error('Error fetching exhibitions:', error))
    
    setUpdated(false)

    console.log(updated)
  }, [updated])

  return (
    <div className='w-screen min-h-screen'>
      <div className='content-wrapper-wo-searchbar pt-12 p-6 xl:px-16 lg:px-8'>
        <div className="pb-4 flex justify-between items-center w-full">
          <h1>Bookmarks</h1>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8'>
          {exhibitions.map((exhibition) => (
            <Exhibition key={exhibition.id} json={exhibition} update={setExhibitions} updated={setUpdated}/>
          ))}
        </div>

        {exhibitions.length === 0 &&
          <div>
            <Link href={'/'}>
              <button className='px-4 py-3 bg-black text-white rounded-xl'>Start exploring</button>
            </Link>
          </div>}
      </div>
    </div>
  )
}