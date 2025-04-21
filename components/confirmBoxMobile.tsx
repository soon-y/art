import { Button } from "./ui/button"
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Calendar1, Clock3, UserRound } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface props {
  json: {
    id: number
    name: string
    title: string
    price: number
    imgid: number
    content: string
    bookmark: boolean
    address: string
    bookmark_time: string
  }
  whenDay: number
  whenMonth: number
  whenYear: number
  whenHour: number
  whoNum: number
  bookingID: number
}

const ConfirmBoxMobile: React.FC<props> = ({ json, whenDay, whenMonth, whenYear, whenHour, whoNum, bookingID=0 }) => {
  const router = useRouter()
  const [isBookingPage, setIsBookingPage] = useState<boolean>(false)
  const pathname = usePathname()
  const months: string[] = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ]

  useEffect(() => {
    setIsBookingPage(!!pathname?.includes('booking'))
  }, [pathname])

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

  const insert = async () => {
    const newBooking = {
      ex_id: json.id,
      booking_time: parseFormattedDate(`${whenHour}:00, ${whenDay} ${months[whenMonth]} ${whenYear}`),
      booked_time: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString(),
      who: whoNum,
      address: json.address,
    }

    const response = await fetch('/api/booking/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBooking),
    })

    const result = await response.json()
    if (result.success) {
      router.push('/visits')
    } else {
      console.error("Error:", result.error)
    }
  }


  const update = async (id: number) => {
    const newBooking = {
      booking_time: parseFormattedDate(`${whenHour}:00, ${whenDay} ${months[whenMonth]} ${whenYear}`),
      booked_time: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString(),
      who: whoNum,
      address: json.address,
    }

    const response = await fetch('/api/booking/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, newBooking }),
    })

    const result = await response.json()
    if (result.success) { router.push('/visits') }
    console.log(result)
  }

  const cancel = async (id: number) => {
    const response = await fetch('/api/booking/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
    const result = await response.json()
    if (result.success) { router.push('/visits') }
    console.log(result)
  }

  return (
    <div className='bg-muted fixed border-t bottom-0 left-0 bg-background w-[100vw] h-[80px] grid grid-cols-[1fr_170px] items-center px-6 gap-4 md:hidden'>
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
  )
}

export default ConfirmBoxMobile