'use client'

import { MapPin, ChevronLeft, Landmark, Calendar1, UserRound, BadgeEuro } from 'lucide-react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { HistoryData } from '@/types'
import Alert from "@/components/alert"

export default function VisitDetailPage({ id }: { id: string }) {
  const [error, setError] = useState<boolean>(false)
  const [data, setData] = useState<HistoryData | null>(null)
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const res = await fetch(`/api/visit/${id}/fetch`)
    const result = await res.json()
    if (result.success) {
      console.log(result)
      setData(result.history)
    } else {
      setError(true)
      setTimeout(() => setError(false), 3000)
    }
  }

  const formatTime = (isoString: string) => {
    const date = new Date(isoString)
    const time = date.toLocaleString('en-US', {
      hour: 'numeric',
      hour12: true,
    })

    const fullDate = date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    return `${time}, ${fullDate}`
  }

  return (
    <>
      <div className='mt-4 pb-10 md:pb-0'>
        <div className='mb-6'>
          <Link href={'/visits'} className='md:hidden'>
            <ChevronLeft />
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-[1fr_1fr] md:gap-10'>
          <div>
            <div className='mb-4'>

              <h3 className='font-medium text-2xl mb-2 flex'>You visited
                {data !== null ?
                  <span className='font-bold ml-2'>{data.exhibition.title}.</span> :
                  <div className='animate-pulse bg-gray-100 w-48 h-8 rounded-lg m-auto ml-2'></div>}
              </h3>
              <div className='flex gap-2 items-center py-1'>
                <Calendar1 size={18} color='gray' />
                {data !== null ?
                  <p className='font-semibold'>{formatTime(data.booking_time)}</p> :
                  <div className='animate-pulse bg-gray-100 w-36 h-5 rounded-lg inline mt-1'></div>
                }
              </div>
              <div className='flex gap-2 items-center py-1'>
                <UserRound size={18} color='gray' />
                {data !== null ?
                  <p className='font-semibold'>{data.who}</p> :
                  <div className='animate-pulse bg-gray-100 w-8 h-5 rounded-lg inline mt-1'></div>
                }
              </div>
              <div className='flex gap-2 items-center pt-4 pb-1 border-t mt-2'>
                <Landmark size={18} color='gray' />
                {data !== null ?
                  <p>{data.exhibition.name}</p> :
                  <div className='animate-pulse bg-gray-100 w-48 h-5 rounded-lg inline mt-1'></div>
                }
              </div>
              <div className='flex gap-2 items-center py-1'>
                <MapPin size={18} color='gray' />
                {data !== null ?
                  <p>{data.exhibition.address}</p> :
                  <div className='animate-pulse bg-gray-100 w-48 h-5 rounded-lg inline mt-1'></div>
                }
              </div>
              <div className='flex gap-2 items-center py-1 mb-2'>
                <BadgeEuro size={18} color='gray' />
                {data !== null ?
                  <p>{data.exhibition.price.toFixed(2)}</p> :
                  <div className='animate-pulse bg-gray-100 w-16 h-5 rounded-lg inline mt-1'></div>
                }
              </div>
            </div>

            {data !== null ?
              <div className='md:hidden bg-cover bg-center w-full rounded-2xl h-[300px]' style={{
                backgroundImage: `url('https://picsum.photos/id/${data.exhibition.imgid}/2000/2000')`
              }}>
              </div>
              :
              <div className="md:hidden animate-pulse bg-gray-100 w-full h-[300px] rounded-2xl my-3"></div>
            }

            {data !== null ?
              <div>
                <p className='mt-6 md:m-0 text-muted-foreground font-medium'>{data.exhibition.content}</p>
              </div> :
              <div className='mt-6'>
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="animate-pulse bg-gray-100 w-full h-5 rounded-md my-2"></div>
                ))}
              </div>
            }
          </div>

          {data !== null ?
            <div className='hidden md:block bg-cover bg-center w-full rounded-2xl h-auto' style={{
              backgroundImage: `url('https://picsum.photos/id/${data.exhibition.imgid}/2000/2000')`
            }}>
            </div>
            :
            <div className="hidden md:block animate-pulse bg-gray-100 w-full h-auto rounded-2xl my-3"></div>
          }
        </div>
      </div >

      {error && <Alert msg={
        <>
          Something went wrong.<br />
          Please try again.
        </>
      } />
      }
    </>
  )
}