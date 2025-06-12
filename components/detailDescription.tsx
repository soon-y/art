'use client'

import { useEffect, useState } from 'react'
import { ExhibitionData } from "@/types"

export default function DetailDescription({ id }: { id: string }) {
  const [data, setData] = useState<ExhibitionData | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const res = await fetch(`/api/home/${id}`)
    const result = await res.json()
    if (result.success) {
      setData(result.exhibition)
    }
  }

  const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  return (
    <>
      {data !== null ?
        <>
          <h3 className='md:hidden py-2 text-3xl font-semibold'>{data.title}</h3>
          <p className='md:mt-6 font-semibold'>{data.name}</p>
          <p className='font-semibold'>{formatDate(data.date_from)} - {formatDate(data.date_to)}</p>
          <p className='font-semibold'>€ {data.price.toFixed(2)}</p>
          <p className='py-2 mb-6 text-muted-foreground font-medium'>{data?.content}</p>
        </>
        :
        <div className='mt-3 md:mt-6'>
          <div className='animate-pulse bg-muted w-56 h-[30px] rounded-lg md:hidden'></div>
          <div className="animate-pulse bg-muted w-48 h-5 rounded-lg mt-2"></div>
          <div className="animate-pulse bg-muted w-48 h-5 rounded-lg mt-2"></div>
          <div className="animate-pulse bg-muted w-14 h-5 rounded-lg mt-2"></div>
          <div className='mb-10'>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-muted w-[full] h-5 rounded-lg mt-2"></div>
            ))}
          </div>
        </div>
      }
    </>
  )
}