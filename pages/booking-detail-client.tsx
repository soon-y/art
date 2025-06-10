'use client'

import { useEffect, useState } from 'react'
import ConfirmBox from '@/components/confirmBox'
import ConfirmBoxMobile from '@/components/confirmBoxMobile'
import { Map } from '@/components/map'
import BookingTimePicker from '@/components/bookingTimePicker'
import NumInput from '@/components/numInput'
import DetailTopSection from '@/components/detailTopSection'
import { BookingData } from "@/types"
import Alert from "@/components/alert"
import DetailDescription from '@/components/detailDescription'

export default function BookingPage({ id }: { id: string }) {
  const [whenDay, setWhenDay] = useState<number>(0)
  const [whenMonth, setWhenMonth] = useState<number>(0)
  const [whenYear, setWhenYear] = useState<number>(0)
  const [whenHour, setWhenHour] = useState<number>(0)
  const [whoNum, setWhoNum] = useState<number>(0)
  const [error, setError] = useState<boolean>(false)
  const [data, setData] = useState<BookingData | null>(null)
  const title = id.replace(/_\d+$/, '').replace(/_/g, ' ')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const res = await fetch(`/api/visit/booking/${id}`)
    const result = await res.json()
    if (result.success) {
      const date = new Date(result.booking.booking_time)
      setData(result.booking)
      setWhenDay(date.getDate())
      setWhenMonth(date.getMonth())
      setWhenYear(date.getFullYear())
      setWhenHour(date.getHours())
      setWhoNum(result.booking.who)
    } else {
      setError(true)
      setTimeout(() => setError(false), 3000)
    }
  }

  const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  return (
    <>
      <div className='mb-24'>
        <DetailTopSection id={title} />
        <div className='mt-[370px] md:mt-0 md:grid md:grid-cols-[1fr_300px] md:gap-10'>
          <div>
            <div>
              {data !== null ?
                <p className='text-sm/6 md:hidden mt-4 py-2'>booked on <span className='font-medium'> {formatDate(data.booked_time)}</span></p> :
                <div className="animate-pulse bg-gray-100 w-24 h-5 rounded-lg "></div>
              }
              <DetailDescription id={title} />
            </div>

            <div className='border-t'>
              <h3 className='mt-6 text-xl font-semibold'>Where you&apos;ll visit</h3>
              {data !== null ?
                <>
                  <p className='pt-2 pb-4'>{data.address}</p>
                  <Map lat={data.latitude} lon={data.longitude} />
                </>
                :
                <>
                  <div className="animate-pulse bg-gray-100 w-48 h-5 rounded-lg my-3"></div>
                  <div className="animate-pulse bg-gray-100 w-full h-[400px] rounded-2xl overflow-hidden mb-8"></div>
                </>
              }
            </div>

            {data !== null ?
              <BookingTimePicker whenDay={whenDay} whenMonth={whenMonth} whenYear={whenYear} whenHour={whenHour}
                setWhenDay={setWhenDay} setWhenMonth={setWhenMonth} setWhenYear={setWhenYear} setWhenHour={setWhenHour}
                dateFrom={data.exhibition.date_from} dateTo={data.exhibition.date_to}
              />
              :
              <div className='border-t' id='selectDate'>
                <h3 className='mt-6 text-xl font-semibold mb-4'>When you&apos;ll visit</h3>
                <div className='grid grid-cols-1 md:grid md:grid-cols-[7fr_3fr] md:gap-8 lg:grid-cols-[6fr_4fr] lg:gap-10'>
                  <div className='w-full animate-pulse bg-gray-100 rounded-lg h-auto'></div>
                  <div className='grid grid-cols-3 gap-4 md:gap-4 md:grid-cols-1 md:grid-rows-6 lg:gap-6'>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className='w-full h-8 animate-pulse bg-gray-100 rounded-lg'></div>
                    ))}
                  </div>
                </div>
              </div>
            }

            <div className='border-t mt-8' id='selectWho'>
              <h3 className='mt-6 text-xl font-semibold'>How many people?</h3>
              {data !== null ?
                <NumInput setValue={setWhoNum} initial={whoNum} />
                :
                <div className="animate-pulse bg-gray-100 w-36 h-12 rounded-lg mx-auto my-1"></div>
              }
            </div>
          </div>

          {data !== null ?
            <ConfirmBox json={data.exhibition} whenDay={whenDay} whenMonth={whenMonth} whenYear={whenYear} whenHour={whenHour} whoNum={whoNum} bookingID={data.id} bookedDate={data.booked_time} />
            :
            <div className="animate-pulse bg-gray-100 w-full h-[350px] mx-auto my-1 shadow-xl my-10 p-6 rounded-xl"></div>
          }
        </div>
        {data !== null ?
          <ConfirmBoxMobile json={data.exhibition} whenDay={whenDay} whenMonth={whenMonth} whenYear={whenYear} whenHour={whenHour} whoNum={whoNum} bookingID={data.id} />
          :
          <div className='fixed border-t bottom-0 left-0 animate-pulse bg-gray-100 w-full h-[80px] z-100'></div>
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
