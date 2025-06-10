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
          <h3 className='md:hidden mt-4 py-2 text-3xl font-semibold'>{data.title}</h3>
          <p className='md:mt-6 font-semibold'>{data.name}</p>
          <p className='font-semibold'>{formatDate(data.date_from)} - {formatDate(data.date_to)}</p>
          <p className='font-semibold'>€ {data.price.toFixed(2)}</p>
          <p className='py-2 mb-6 text-muted-foreground font-medium'>{data?.content}
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </>
        :
        <div className='mt-6'>
          <div className='animate-pulse bg-gray-100 w-[full] h-10 rounded-lg md:hidden'></div>
          <div className="animate-pulse bg-gray-100 w-[full] h-5 rounded-lg mt-2"></div>
          <div className="animate-pulse bg-gray-100 w-48 h-5 rounded-lg mt-2"></div>
          <div className="animate-pulse bg-gray-100 w-16 h-5 rounded-lg mt-2"></div>
          <div className='mb-10'>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-100 w-[full] h-5 rounded-lg mt-2"></div>
            ))}
          </div>
        </div>
      }
    </>
  )
}