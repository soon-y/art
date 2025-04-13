'use client'

import Navigation from "@/components/navigation"
import { DoorOpen } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <>
      <div className="py-4 flex justify-between items-center w-full">
        <p className='text-2xl font-bold'>Visits</p>
      </div>

      <div className='h-[auto] text-center overflow-hidden border items-center rounded-2xl md:h-[400px] md:text-left md:grid md:grid-cols-2'>
        <div className="text-muted-foreground flex flex-col items-center justify-center p-10">
          <DoorOpen size={24} />
          <p className="py-2">No Docents booked</p>
          <Link href={'/'}>
            <Button className="mt-5 p-6 flex items-center" size={"sm"} variant={'default'}>
              <span>Start exploring</span>
            </Button>
          </Link>
        </div>
        <div className='bg-cover bg-center w-full h-full hidden md:block' style={{
          backgroundImage: `url('https://picsum.photos/id/193/2000/2000')`
        }}>
        </div>
      </div>

      <p className='text-md font-bold mt-4 py-4'>Where you&apos;ve been</p>
      <div className='pb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
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
      <Navigation />
    </>
  )
}