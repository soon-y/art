'use client'

import Navigation from "@/components/navigation"
import { DoorOpen } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

interface BookingData {
  id: number
  address: string
  who: number
  booked_time: string
  booking_time: string
  exhibition: ExhibitionData
}

interface ExhibitionData {
  name: string
  title: string
  price: number
  imgid: number
  content: string
  bookmark: boolean
  bookmark_time: string
}

interface VisitProps {
  history?: BookingData[]
  booked?: BookingData[]
}

const Visit: React.FC<VisitProps> = ({ history = [], booked = [] }) => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
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

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const fullDate = date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
    return `${fullDate}`
  }

  const styledFormatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const time = date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
    const day = date.getDate().toString()
    const month = date.toLocaleString('en-GB', { month: 'long' })
    const year = date.getFullYear().toString()
    return <div>
      <p className="font-semibold"> {time}</p>
      <p className="text-xl pr-1 font-semibold">{month} {day}</p>
      <p> {year}</p>
    </div>
  }

  const daysLeft = (timestamp: string): string => {
    const bookingDate = new Date(timestamp)
    const today = new Date()
    bookingDate.setHours(0, 0, 0, 0)
    today.setHours(0, 0, 0, 0)

    const diffTime = bookingDate.getTime() - today.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Tomorrow"
    if (diffDays < 0) return "Already passed"

    return `${diffDays} days left`
  }

  return (
    <div className="mb-24 md:mb-12">
      <div className="pt-4 flex justify-between items-center w-full">
        <h1 className='text-2xl font-bold'>Visits</h1>
      </div>

      {booked.length === 0 ?
        <div className='mt-4 h-[auto] text-center overflow-hidden border items-center rounded-2xl md:h-[400px] md:text-left md:grid md:grid-cols-[4fr_6fr]'>
          <div className="text-muted-foreground flex flex-col p-10 items-center md:items-start">
            <DoorOpen size={28} />
            <p className="font-bold text-lg/5 py-2">No sign language tours booked yet</p>
            <p className="font-medium text-base/5">The world of art is waiting. Plan your next visit today.</p>
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
        :
        <div className='mb-22 md:mb-0 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {booked.map((json) => (
            <Link key={json.id} href={`/visits/booking/${encodeURIComponent(json.exhibition.title.replace(/ /g, "_"))}_${json.id}`}>
              <div className='grid grid-rows gap-3 border shadow-xl rounded-2xl overflow-hidden' key={json.id}>
                <div className='bg-cover bg-center w-[100%] aspect-[2]' style={{
                  backgroundImage: `url('https://picsum.photos/id/${json.exhibition.imgid}/1000/1000')`
                }}>
                  <span className="font-semibold text-sm bg-background px-2 py-1 rounded-md absolute m-3">{daysLeft(json.booking_time)}</span>
                </div>
                <div className='px-4'>
                  <p className="text-sm/5 text-muted-foreground">booked on {formatDate(json.booked_time)}</p>
                  <h3 className='text-xl/7 font-bold'>{json.exhibition.title}</h3>
                  <p className='text-base/6 text-muted-foreground font-medium'>{json.exhibition.name}</p>
                  <p className='text-base/6 text-muted-foreground font-semibold'>{json.who} {json.who == 1 ? 'person' : 'people'}</p>
                  <div className='border-t mt-3 pt-3'>
                    <div className="grid grid-cols-[1fr_1fr] gap-3 pb-4">
                      <div className='text-sm/5 text-muted-foreground border-r'>{styledFormatTime(json.booking_time)}</div>
                      <p className='text-sm/5 text-muted-foreground font-medium'>{json.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      }

      {history.length > 0 && (
        <>
          <p className='text-lg font-bold mt-10'>Where you&apos;ve been</p>
          <div className='mb-22 md:mb-0 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {history.map((json) => (
            <Link key={json.id} href={`/visits/${encodeURIComponent(json.exhibition.title.replace(/ /g, "_"))}_${json.id}`}>
              <div className='grid grid-cols-[100px_1fr] gap-4'>
                <div className='bg-cover bg-center w-[100%] rounded-2xl aspect-[1]' style={{
                  backgroundImage: `url('https://picsum.photos/id/${json.exhibition.imgid}/500/500')`
                }}></div>
                <div className='grid justify-between items-center'>
                  <div>
                    <h3 className='text-base/5 font-bold'>{json.exhibition.title}</h3>
                    <p className='text-sm/5 text-muted-foreground'>{json.exhibition.name}</p>
                    <p className='text-sm/5 text-muted-foreground'>{json.address}</p>
                    <p className='text-sm/5 text-muted-foreground font-medium'>{formatTime(json.booked_time)}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          </div>
        </>
      )}
      <Navigation />
    </div>
  )
}

export default Visit