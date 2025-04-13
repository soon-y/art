'use client'

import { useState } from 'react'
import Searchbar from "@/components/searchbar"
import Navigation from "@/components/navigation"
import Exhibition from '@/components/exhibition'

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

export default function Explore({ initialData }: { initialData: ExhibitionData[] }) {
  const [exhibitions, setExhibitions] = useState(initialData)

  return (
    <>
      <Navigation />
      <Searchbar/>
      <div className='exhibition mt-28 mb-16 md:mt-24 md:mb-0 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-8'>
        {exhibitions.map((exhibition) => (
          <Exhibition key={exhibition.id} json={exhibition} update={setExhibitions} />
        ))}
      </div>
    </>
  )
}