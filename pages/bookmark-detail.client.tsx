'use client'

import { useState } from 'react'
import ConfirmBox from '@/components/confirmBox'
import ConfirmBoxMobile from '@/components/confirmBoxMobile'
import BookingTimePicker from '@/components/bookingTimePicker'
import NumInput from '@/components/numInput'
import { Map } from '@/components/map'
import DetailTopSection from '@/components/detailTopSection'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger, useGSAP)

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
}

const BookmarkDetailPage: React.FC<props> = ({ json }) => {
  const today = new Date()
  const [whenDay, setWhenDay] = useState<number>(0)
  const [whenMonth, setWhenMonth] = useState<number>(today.getMonth())
  const [whenYear, setWhenYear] = useState<number>(today.getFullYear())
  const [whenHour, setWhenHour] = useState<number>(0)
  const [whoNum, setWhoNum] = useState<number>(1)

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: '.booking',
      start: 'top 90px',
      pin: true,
      pinSpacing: false,
    })
  })

  return (
    <>
      <div className='mb-24'>
        <DetailTopSection json={json} />
        <div className='mt-[370px] md:mt-0 md:grid md:grid-cols-[1fr_300px] md:gap-10'>
          <div>
            <h3 className='md:hidden mt-4 py-2 text-3xl font-semibold'>{json?.title}</h3>
            <p className='md:mt-6 font-semibold'>{json?.name}</p>
            <p className='font-semibold'>€ {json?.price.toFixed(2)}</p>
            <p className='py-2 mb-6 text-muted-foreground font-medium'>{json?.content}
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>

            <div className='border-t'>
              <h3 className='mt-6 text-xl font-semibold'>Where you&apos;ll visit</h3>
              <p className='pt-2 pb-4'>address</p>
              <Map />
            </div>

            <BookingTimePicker whenDay={whenDay} whenMonth={whenMonth} whenYear={whenYear} whenHour={whenHour}
              setWhenDay={setWhenDay} setWhenMonth={setWhenMonth} setWhenYear={setWhenYear} setWhenHour={setWhenHour}
            />

            <div className='border-t mt-8' id='selectWho'>
              <h3 className='mt-6 text-xl font-semibold'>How many people?</h3>
              <NumInput setValue={setWhoNum} initial={whoNum} />
            </div>
          </div>
          <ConfirmBox json={json} whenDay={whenDay} whenMonth={whenMonth} whenYear={whenYear} whenHour={whenHour} whoNum={whoNum} bookingID={0}/>
        </div>
        <ConfirmBoxMobile json={json} whenDay={whenDay} whenMonth={whenMonth} whenYear={whenYear} whenHour={whenHour} whoNum={whoNum} bookingID={0}/>
      </div>
    </>
  )
}

export default BookmarkDetailPage
