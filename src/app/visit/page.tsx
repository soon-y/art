'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='w-screen min-h-screen'>
      <div className='content-wrapper-wo-searchbar p-6 xl:px-16 lg:px-8'>
        <div className="pb-4 flex justify-between items-center w-full">
          <h1>Visits</h1>
        </div>

        <div className='h-[auto] text-center overflow-hidden border border-gray-300 items-center rounded-2xl md:h-[400px] md:text-left md:grid md:grid-cols-2'>
          <div className="p-8" style={{ alignSelf: 'center' }}>
            <FontAwesomeIcon icon={faFolderOpen} style={{ fontSize: '4rem', color: 'var(--deactivate)' }} />
            <p className="p-2 texst-gray-100">No Docents booked</p>
            <Link href={'/'}>
              <button className='w-[100%] md:w-[auto] px-4 py-3 bg-[var(--main)] text-white rounded-xl'>Start exploring</button>
            </Link>
          </div>
          <div className='bg-cover bg-center w-[100%] h-[100%] hidden md:block' style={{
            backgroundImage: `url('https://picsum.photos/id/193/300/300')`
          }}>
          </div>
        </div>

        <h2 className='pt-8'>Where you&apos;ve been</h2>
        <div className='py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          <div className='grid grid-cols-[100px_1fr] gap-4'>
            <div className='bg-cover bg-center w-[100%] rounded-2xl aspect-[1]' style={{
              backgroundImage: `url('https://picsum.photos/id/63/100/100')`
            }}>
            </div>
            <div>
              <h3>Espresso</h3>
              <p>Espresso Gallery</p>
              <p>Hamburg</p>
              <p>12 Sep 2023</p>
            </div>
          </div>

          <div className='grid grid-cols-[100px_1fr] gap-4'>
            <div className='bg-cover bg-center w-[100%] rounded-2xl aspect-[1]' style={{
              backgroundImage: `url('https://picsum.photos/id/91/100/100')`
            }}>
            </div>
            <div>
              <h3>Camera</h3>
              <p>Espresso Gallery</p>
              <p>Hamburg</p>
              <p>12 Sep 2023</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}