'use client'

import { useState, useEffect, useRef } from 'react'
import { Bookmark, ChevronLeft, Share, Calendar1, Clock3, UserRound } from 'lucide-react'
import Link from 'next/link'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Button } from "@/components/ui/button"
import Calendar from '@/components/calendar'
import NumInput from '@/components/numInput'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger, useGSAP)

mapboxgl.accessToken = 'pk.eyJ1Ijoic29vbnkiLCJhIjoiY204bmxwZzFsMDIxZDJqc2MyajBrdmFoOSJ9.socb5Bc_Z_DNEfwbgfR18w'

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
    who: number
    time: string
  }
}

const BookingPage: React.FC<props> = ({ json }) => {
  const dateObj = new Date(json?.time)
  const [isBookmarked, setIsBookmarked] = useState(json?.bookmark)
  const [whenDay, setWhenDay] = useState<number>(dateObj.getDate())
  const [whenMonth, setWhenMonth] = useState<number>(dateObj.getMonth())
  const [whenYear, setWhenYear] = useState<number>(dateObj.getFullYear())
  const [whenHour, setWhenHour] = useState<number>(dateObj.getHours())
  const [whoNum, setWhoNum] = useState<number>(json?.who)
  const months: string[] = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ]

  const toggleBookmark = async (id: number) => {
    try {
      const response = await fetch('/api/bookmark', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, bookmark: isBookmarked }),
      })

      const data = await response.json();
      if (response.ok) {
        setIsBookmarked(!isBookmarked);
      } else {
        console.error('Failed to update bookmark:', data.error)
      }
    } catch (error) {
      console.error('Error updating bookmark:', error)
    }
  }

  const toDate = () => {
    const selectDate = document.getElementById('selectDate')
    if (selectDate) {
      const y = selectDate.getBoundingClientRect().top + window.scrollY;
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

  const update = async (id: number) => {
    const newData = {
      title: json.title,
      name: json.name,
      price: json.price,
      imgid: json.imgid,
      content: json.content,
      time: parseFormattedDate(`${whenHour}:00, ${whenDay} ${months[whenMonth]} ${whenYear}`),
      who: whoNum,
      address: '123 Art Street, City',
      bookmark: json.bookmark
    }

    const response = await fetch('/api/booking/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id, newData}),
    })

    const result = await response.json()
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
    console.log(result)
  }

  return (
    <>
      <div className='mb-24'>
        <div className='mt-4 mb-6 grid grid-cols-[1fr_24px_24px] md:grid-cols-[1fr_80px_100px] gap-5 items-center'>
          <h3 className='text-2xl font-bold hidden md:block'>{json?.title}</h3>
          <Link href={'/'} className='md:hidden'>
            <ChevronLeft />
          </Link>
          <div className='flex'>
            <Share size={20} />
            <span className='hidden md:block font-medium underline text-sm pl-2 cursor-pointer'>Share</span>
          </div>
          <div className='flex' onClick={() => toggleBookmark(json?.id)}>
            <Bookmark className={`cursor-pointer ${isBookmarked ? 'fill-primary text-primary' : 'fill-background text-foreground'}`} />
            <span className='hidden md:block font-medium underline text-sm pl-2 cursor-pointer'>Bookmark</span>
          </div>
        </div>
        <div className='bg-cover bg-center w-[100%] rounded-2xl h-[400px] md:h-[500px]' style={{
          backgroundImage: `url('https://picsum.photos/id/${json?.imgid}/2000/2000')`
        }}>
        </div>

        <div className='md:grid md:grid-cols-[1fr_300px] md:gap-10'>
          <div>
            <h3 className='md:hidden mt-4 py-2 text-3xl font-semibold'>{json?.title}</h3>
            <p className='md:mt-6 font-semibold'>{json?.name}</p>
            <p className='font-semibold'>€ {json?.price.toFixed(2)}</p>

            <p className='py-2 mb-6 text-muted-foreground font-medium'>{json?.content}
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>

            <div className='border-t'>
              <h3 className='mt-6 text-xl font-semibold'>Where you&apos;ll visit</h3>
              <p className='pt-2 pb-4'>{json?.address}</p>
              <Map />
            </div>

            <div className='border-t' id='selectDate'>
              <h3 className='mt-6 text-xl font-semibold'>When you&apos;ll visit</h3>
              <div className='grid grid-cols-1 md:grid md:grid-cols-[7fr_3fr] md:gap-8 lg:grid-cols-[6fr_4fr] lg:gap-10'>
                <div>
                  <Calendar selDay={whenDay} selMonth={whenMonth} selYear={whenYear} setDay={setWhenDay} setMonthSelected={setWhenMonth} setYearSelected={setWhenYear} />
                </div>
                {whenDay !== 0 &&
                  <div className='grid grid-cols-3 gap-4 my-4 md:gap-4 md:grid-cols-1 md:grid-rows-6 lg:gap-6'>
                    <Button className='md:h-full border' variant={whenHour === 10 ? 'secondary' : 'outline'} onClick={() => { setWhenHour(10) }}>10:00</Button>
                    <Button className='md:h-full border' variant={whenHour === 11 ? 'secondary' : 'outline'} onClick={() => { setWhenHour(11) }}>11:00</Button>
                    <Button className='md:h-full border' variant={whenHour === 13 ? 'secondary' : 'outline'} onClick={() => { setWhenHour(13) }}>13:00</Button>
                    <Button className='md:h-full border' variant={whenHour === 14 ? 'secondary' : 'outline'} onClick={() => { setWhenHour(14) }}>14:00</Button>
                    <Button className='md:h-full border' variant={whenHour === 15 ? 'secondary' : 'outline'} onClick={() => { setWhenHour(15) }}>15:00</Button>
                    <Button className='md:h-full border' variant={whenHour === 16 ? 'secondary' : 'outline'} onClick={() => { setWhenHour(16) }}>16:00</Button>
                  </div>
                }
              </div>
            </div>

            <div className='border-t mt-8' id='selectWho'>
              <h3 className='mt-6 text-xl font-semibold'>How many people?</h3>
              <NumInput setValue={setWhoNum} initial={whoNum} />
            </div>
          </div>

          <div className='hidden md:block booking'>
            <div className='shadow-xl my-10 p-6 bg-muted rounded-xl'>
              <div className='border-b'>
                <h3 className='py-1 text-xl font-semibold'>{json?.title}</h3>
                <p className='py-1'>{json?.name}</p>
                <p className='pb-3'>€ {json?.price.toFixed(2)}</p>
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
              <Link href={'/visits'}>
                <Button disabled={whenHour === 0 || whenDay === 0} className='w-full mt-4' onClick={() => update(json?.id)}>
                  <span className='font-semibold'>Change</span>
                </Button>
                <Button variant={'outline'} className='w-full mt-4' onClick={() => cancel(json?.id)}>
                  <span className='font-semibold'>Cancel</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className='bg-muted fixed border-t bottom-0 left-0 bg-background w-[100vw] h-[80px] grid grid-cols-[1fr_80px_80px] items-center pl-6 pr-4 gap-2 md:hidden'>
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
          <Link href={'/visits'}>
            <Button disabled={whenHour === 0 || whenDay === 0} className='w-full' onClick={() => update(json?.id)}>
              <span className='font-semibold'>Change</span>
            </Button>
          </Link>
          <Link href={'/visits'}>
            <Button variant={'outline'} className='w-full' onClick={() => cancel(json?.id)}>
              <span className='font-semibold'>Cancel</span>
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}

const Map: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (map.current || !mapContainer.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [127.024612, 37.532600],
      zoom: 14,
      scrollZoom: false,
      dragPan: true,
      dragRotate: true,
      touchZoomRotate: false,
      doubleClickZoom: false,
      keyboard: false,
    })

    new mapboxgl.Marker({
      color: "#ff9501",
    })
      .setLngLat([127.024612, 37.532600])
      .addTo(map.current)
  }, [])

  return (
    <div
      ref={mapContainer}
      className='w-full h-[400px] rounded-2xl overflow-hidden mb-8'
    />
  )
}

export default BookingPage
