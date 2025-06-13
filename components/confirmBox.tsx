import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from "./ui/button"
import { Calendar1, Clock3, UserRound } from 'lucide-react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExhibitionData } from "@/types"
import Alert from "@/components/alert"
gsap.registerPlugin(ScrollTrigger, useGSAP)

interface props {
  json: ExhibitionData
  whenDay: number
  whenMonth: number
  whenYear: number
  whenHour: number
  whoNum: number
  bookingID: number
  bookedDate: string
  lat: number
  lon: number
  addr: string
}

const ConfirmBox: React.FC<props> = ({ json, whenDay, whenMonth, whenYear, whenHour, whoNum, bookingID = 0, bookedDate = '', lat, lon, addr = '' }) => {
  const [error, setError] = useState<boolean>(false)
  const [isBookingPage, setIsBookingPage] = useState<boolean>(false)
  const pathname = usePathname()
  const router = useRouter()
  const months: string[] = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ]

  useEffect(() => {
    setIsBookingPage(!!pathname?.includes('booking'))
  }, [pathname])

  const toDate = () => {
    const selectDate = document.getElementById('selectDate')
    if (selectDate) {
      const y = selectDate.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: y - 88,
        behavior: 'smooth',
      })
    }
  }

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: '.booking',
      start: 'top 90px',
      pin: true,
      pinSpacing: false,
    })
  })

  const parseFormattedDate = (formatted: string): string => {
    const cleaned = formatted.replace(/\s+/g, ' ').trim()
    const [timePart, datePart] = cleaned.split(', ')
    const localDate = new Date(`${datePart} ${timePart}`)
    const year = localDate.getFullYear()
    const month = String(localDate.getMonth() + 1).padStart(2, '0')
    const day = String(localDate.getDate()).padStart(2, '0')
    const hours = String(localDate.getHours()).padStart(2, '0')
    const minutes = String(localDate.getMinutes()).padStart(2, '0')
    const seconds = String(localDate.getSeconds()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
  }

  const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  const insert = async () => {
    const newBooking = {
      ex_id: json.id,
      address: isBookingPage ? json.address : json.address + ', ' + addr,
      latitude: lat,
      longitude: lon,
      who: whoNum,
      booking_time: parseFormattedDate(`${whenHour}:00, ${whenDay} ${months[whenMonth]} ${whenYear}`),
      booked_time: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString(),
    }

    const notification = {
      activity: 'book',
      title: `${json.title} at ${json.name}`,
      booking_time: `at ${whenHour}:00 on ${whenDay} ${months[whenMonth]} ${whenYear}`,
      who: whoNum,
    }


    const response = await fetch('/api/booking/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newBooking, notification }),
    })

    if (!response.ok) {
      console.error("Server returned error:", response.status)
      setError(true)
      setTimeout(() => setError(false), 3000)
      return
    }

    const result = await response.json()
    if (result.success) {
      router.push('/visits')
    } else {
      setError(true)
      setTimeout(() => setError(false), 3000)
    }
  }

  const update = async (id: number) => {
    const newBooking = {
      booking_time: parseFormattedDate(`${whenHour}:00, ${whenDay} ${months[whenMonth]} ${whenYear}`),
      booked_time: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString(),
      who: whoNum,
    }

     const notification = {
      activity: 'update',
      title: `${json.title} at ${json.name}`,
      booking_time: `at ${whenHour}:00 on ${whenDay} ${months[whenMonth]} ${whenYear}`,
      who: whoNum,
    }


    const response = await fetch('/api/booking/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, newBooking, notification }),
    })

    const result = await response.json()
    if (result.success) {
      router.push('/visits')
    } else {
      setError(true)
      setTimeout(() => setError(false), 3000)
    }
  }

  const cancel = async (id: number) => {
     const notification = {
      activity: 'delete',
      title: `${json.title} at ${json.name}`,
      booking_time: `at ${whenHour}:00 on ${whenDay} ${months[whenMonth]} ${whenYear}`,
      who: whoNum,
    }

    const response = await fetch('/api/booking/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, notification }),
    })
    const result = await response.json()
    if (result.success) {
      router.push('/visits')
    } else {
      setError(true)
      setTimeout(() => setError(false), 3000)
    }
  }

  return (
    <>
      <div className='hidden md:block booking'>
        <div className='shadow-xl my-10 p-6 bg-muted rounded-xl'>
          <div className='border-b'>
            {bookingID > 0 &&
              <p className="text-muted-foreground text-sm">booked on {formatDate(bookedDate)}</p>
            }
            <h3 className='text-xl/9 font-semibold'>{json.title}</h3>
            <p className='text-base/7 font-medium'>{json.name}</p>
            <p className='text-base/7 font-medium'>{formatDate(json.date_from)} - {formatDate(json.date_to)}</p>
            <p className='text-base/7 font-medium pb-3'>€ {json.price.toFixed(2)}</p>
          </div>

          <div className='flex items-center pt-3'>
            <Calendar1 className='pr-2 text-muted-foreground' />
            {whenDay !== 0 ?
              <p className="font-medium">{whenDay} {months[whenMonth]} {whenYear}</p> :
              <p className="text-sm font-medium text-muted-foreground cursor-pointer" onClick={toDate}>Select date</p>
            }
          </div>
          <div className='flex items-center pt-2'>
            <Clock3 className='pr-2 text-muted-foreground' />
            {whenHour !== 0 ?
              <div className='flex items-center'>
                <p className="font-medium">{whenHour} : 00</p>
              </div> :
              <p className="text-sm font-medium text-muted-foreground cursor-pointer" onClick={toDate}>Select time</p>
            }
          </div>
          <div className='flex items-center py-2'>
            <UserRound className='pr-2 text-muted-foreground' />
            <a href='#selectWho'>
              <p className="font-medium">{whoNum}</p>
            </a>
          </div>
          {bookingID > 0 ?
            <>
              <Button disabled={whenHour === 0 || whenDay === 0} className='w-full mt-4' onClick={() => update(bookingID)}>
                <span className='font-semibold'>Change</span>
              </Button>
              <Button variant={'outline'} className='w-full mt-4' onClick={() => cancel(bookingID)}>
                <span className='font-semibold'>Cancel</span>
              </Button>
            </> :
            <Button disabled={whenHour === 0 || whenDay === 0} className='w-full mt-4' onClick={() => insert()}>
              <span className='font-semibold'>Book</span>
            </Button>
          }
        </div>
      </div>

      <div className='bg-muted fixed border-t bottom-0 left-0 bg-background w-full h-[90px] grid grid-cols-[1fr_170px] items-center px-6 pb-4 gap-4 md:hidden'>
        <div>
          <div className='flex items-center'>
            <Calendar1 className='pr-2 text-muted-foreground' />
            {whenDay !== 0 ?
              <p className="text-sm font-medium">{whenDay} {months[whenMonth]} {whenYear}</p> :
              <p className="text-sm font-medium text-muted-foreground">Select date</p>
            }
          </div>
          <div className='flex items-center'>
            <Clock3 className='pr-2 text-muted-foreground' />
            {whenHour !== 0 ?
              <div className='flex items-center'>
                <p className="text-sm font-medium">{whenHour} : 00</p>
                <UserRound size={16} className='inline ml-4 mr-2 text-muted-foreground' />
                <p className="text-sm font-medium">{whoNum}</p>
              </div> :
              <p className="text-sm font-medium text-muted-foreground">Select time</p>
            }
          </div>
        </div>
        {isBookingPage ?
          <div>
            <Button disabled={whenHour === 0 || whenDay === 0} className="w-[80px]" onClick={() => update(bookingID)}>
              <span className='font-semibold'>Change</span>
            </Button>
            <Button variant={'outline'} className="w-[80px] ml-[10px]" onClick={() => cancel(bookingID)}>
              <span className='font-semibold'>Cancel</span>
            </Button>
          </div> :
          <Button disabled={whenHour === 0 || whenDay === 0} className='w-full' onClick={() => insert()}>
            <span className='font-semibold'>Book</span>
          </Button>
        }
      </div>

      {error && <Alert msg={
        <>
          Something went wrong.<br />
          Please try again.
        </>
      } />}
    </>
  )
}

export default ConfirmBox