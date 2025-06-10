'use client'

import { useEffect, useState } from 'react'
import NumInput from '@/components/numInput'
import BookingTimePicker from '@/components/bookingTimePicker'
import ConfirmBox from '@/components/confirmBox'
import ConfirmBoxMobile from '@/components/confirmBoxMobile'
import { Map } from '@/components/map'
import DetailTopSection from '@/components/detailTopSection'
import { ExhibitionData, SearchItem } from "@/types"
import Alert from "@/components/alert"
import DetailDescription from '@/components/detailDescription'

export default function DetailPage({ id }: { id: string }) {
  const [whenDay, setWhenDay] = useState<number>(0)
  const [whenMonth, setWhenMonth] = useState<number>(0)
  const [whenYear, setWhenYear] = useState<number>(0)
  const [whenHour, setWhenHour] = useState<number>(0)
  const [whoNum, setWhoNum] = useState<number>(0)
  const [error, setError] = useState<boolean>(false)
  const [data, setData] = useState<ExhibitionData | null>(null)
  const [search, setSearch] = useState<SearchItem | null>(null)

  useEffect(() => {
    fetchData()
    fetchSearchData()
  }, [])

  const fetchData = async () => {
    const res = await fetch(`/api/home/${id}`)
    const result = await res.json()
    if (result.success) {
      setData(result.exhibition)
    } else {
      setError(true)
      setTimeout(() => setError(false), 3000)
    }
  }

  const fetchSearchData = async () => {
    const res = await fetch(`/api/home/search/fetch`)
    const result = await res.json()
    if (result.success) {
      setWhenDay(Number(result.data[0].date.split('-')[2]))
      setWhenMonth(Number(result.data[0].date.split('-')[1] - 1))
      setWhenYear(Number(result.data[0].date.split('-')[0]))
      setWhoNum(result.data[0].who)
      setSearch(result.data[0])
    } else {
      setError(true)
      setTimeout(() => setError(false), 3000)
    }
  }

  return (
    <>
      <div className='mb-24'>
        <DetailTopSection id={id} />
        <div className='mt-[370px] md:mt-0 md:grid md:grid-cols-[1fr_300px] md:gap-10'>
          <div>
            <DetailDescription id={id} />

            <div className='border-t'>
              <h3 className='mt-6 text-xl font-semibold'>Where you&apos;ll visit</h3>
              {search !== null ?
                <>
                  <p className='pt-2 pb-4'>{search.address}</p>
                  <Map lat={search.latitude} lon={search.longitude} />
                </>
                :
                <>
                  <div className="animate-pulse bg-gray-100 w-48 h-5 rounded-lg my-3"></div>
                  <div className="animate-pulse bg-gray-100 w-full h-[400px] rounded-2xl overflow-hidden mb-8"></div>
                </>
              }
            </div>

            {(data !== null && search !== null) ?
              <BookingTimePicker whenDay={whenDay} whenMonth={whenMonth} whenYear={whenYear} whenHour={whenHour}
                setWhenDay={setWhenDay} setWhenMonth={setWhenMonth} setWhenYear={setWhenYear} setWhenHour={setWhenHour}
                dateFrom={data.date_from} dateTo={data.date_to}
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
              {search !== null ?
                <NumInput setValue={setWhoNum} initial={whoNum} />
                :
                <div className="animate-pulse bg-gray-100 w-36 h-12 rounded-lg mx-auto my-1"></div>
              }
            </div>
          </div>

          {search !== null && data !== null ?
            <ConfirmBox json={data} whenDay={whenDay} whenMonth={whenMonth} whenYear={whenYear} whenHour={whenHour} whoNum={whoNum} bookingID={0} bookedDate='' />
            :
            <div className="animate-pulse bg-gray-100 w-full h-[350px] mx-auto my-1 shadow-xl my-10 p-6 rounded-xl"></div>
          }
        </div>
        {search !== null && data !== null ?
          <ConfirmBoxMobile json={data} whenDay={whenDay} whenMonth={whenMonth} whenYear={whenYear} whenHour={whenHour} whoNum={whoNum} bookingID={0} />
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