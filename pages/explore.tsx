'use client'

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

export default function Explore({ initialData = [] }: { initialData: ExhibitionData[] }) {
  return (
    <>
      <Navigation />
      <Searchbar/>
      <div className='exhibition mt-28 mb-16 md:mt-24 md:mb-0 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-5 gap-y-8'>
        {initialData.map((exhibition) => (
          <Exhibition key={exhibition.id} json={exhibition} />
        ))}
      </div>
    </>
  )
}