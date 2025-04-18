'use client'

import { MapPin, ChevronLeft, Landmark, Calendar1, UserRound, BadgeEuro } from 'lucide-react'
import Link from 'next/link'

interface Props {
  json: {
    id: number
    name: string
    title: string
    price: number
    imgid: number
    content: string
    time: string
    address: string
    who: number
  }
}

const VisitDetailPage: React.FC<Props> = ({ json }) => {
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

  console.log(json)

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
                <h3 className='font-medium text-2xl mb-2'>You visited <span className='font-bold'>{json?.title}</span>.</h3>
                <div className='flex gap-2 items-center py-1'>
                  <Calendar1 size={18} color='gray' />
                  <p className='font-semibold'>{formatTime(json?.time)}</p>
                </div>
                <div className='flex gap-2 items-center py-1'>
                  <UserRound size={18} color='gray' />
                  <p className='font-semibold'>{json?.who}</p>
                </div>
                <div className='flex gap-2 items-center pt-4 pb-1 border-t mt-2'>
                  <Landmark size={18} color='gray' />
                  <p>{json?.name}</p>
                </div>
                <div className='flex gap-2 items-center py-1'>
                  <MapPin size={18} color='gray' />
                  <p>{json?.address}</p>
                </div>
                <div className='flex gap-2 items-center py-1 mb-2'>
                  <BadgeEuro size={18} color='gray' />
                  <p>{json?.price.toFixed(2)}</p>
                </div>
              </div>
              <div className='md:hidden bg-cover bg-center w-full rounded-2xl h-[300px] md:h-[auto]' style={{
                backgroundImage: `url('https://picsum.photos/id/${json?.imgid}/2000/2000')`
              }}>
              </div>
              <div>
                <p className='mt-6 md:m-0 text-muted-foreground font-medium'>{json?.content}
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </div>

            <div className='hidden md:block bg-cover bg-center w-full rounded-2xl h-[300px] md:h-[auto]' style={{
              backgroundImage: `url('https://picsum.photos/id/${json?.imgid}/2000/2000')`
            }}>
            </div>
          </div>
      </div>
    </>
  )
}

export default VisitDetailPage
