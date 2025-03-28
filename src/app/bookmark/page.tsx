'use client'

import Link from 'next/link'
import Exhibition from '@/components/Exhibition'

export default function Home() {
  return (
    <div className='w-screen min-h-screen'>
      <div className='content-wrapper-wo-searchbar pt-12 p-6 xl:px-16 lg:px-8'>
        <div className="pb-4 flex justify-between items-center w-full">
          <h1>Bookmarks</h1>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8'>
          <Exhibition />
          <Exhibition />
          <Exhibition />
          <Exhibition />
        </div>


        <div>
          <Link href={'/'}>
            <button className='px-4 py-3 bg-black text-white rounded-xl'>Start exploring</button>
          </Link>
        </div>

      </div>
    </div>
  )
}