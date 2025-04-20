'use client'

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
  bookmark_time: string
}

export default function Explore({ initialData = [] }: { initialData: ExhibitionData[] }) {
  return (
    <>
      <div className='exhibition mt-28 mb-24 md:mt-16 md:mb-4 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-5 gap-y-8'>
        {initialData.map((exhibition) => (
          <Exhibition key={exhibition.id} json={exhibition} />
        ))}
      </div>
      <Navigation />
    </>
  )
}