'use client'

import Navigation from "@/components/navigation"
import { DoorOpen } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useState } from 'react'

interface ExhibitionData {
  id: number
  name: string
  title: string
  price: number
  imgid: number
  content: string
  time: string
  address: string
}

export default function Visit({ initialData }: { initialData: ExhibitionData[] }) {
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);

    const time = date.toLocaleString('en-US', {
      hour: 'numeric',
      hour12: true,
    });
  
    const fullDate = date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  
    return `${time}, ${fullDate}`;
  }

  return (
    <>
      <div className="py-4 flex justify-between items-center w-full">
        <h1 className='text-2xl font-bold'>Visits</h1>
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

      <p className='text-lg font-bold mt-10'>Where you&apos;ve been</p>
      <div className='mb-22 md:mb-0 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {initialData.map((json) => (
          <div className='grid grid-cols-[100px_1fr] gap-4' key={json.id}>
            <div className='bg-cover bg-center w-[100%] rounded-2xl aspect-[1]' style={{
              backgroundImage: `url('https://picsum.photos/id/${json.imgid}/500/500')`
            }}>
            </div>
            <div className='py-2'>
              <h3 className='text-base/6 font-bold'>{json.title}</h3>
              <p className='text-sm/5 text-muted-foreground'>{json.name}</p>
              <p className='text-sm/5 text-muted-foreground'>{json.address}</p>
              <p className='text-sm/5 text-muted-foreground'>{formatTime(json.time)}</p>
            </div>
          </div>
        ))}
      </div>
      <Navigation />
    </>
  )
}