'use client'

import { useEffect, useState } from 'react'
import ConfirmBox from '@/components/confirmBox'
import { Map } from '@/components/map'
import BookingTimePicker from '@/components/bookingTimePicker'
import NumInput from '@/components/numInput'
import DetailTopSection from '@/components/detailTopSection'
import { BookingData } from "@/types"
import Alert from "@/components/alert"
import DetailDescription from '@/components/detailDescription'
import { Calendar1, Clock3, UserRound } from 'lucide-react'

export default function BookingPage({ id }: { id: string }) {
  const [whenDay, setWhenDay] = useState<number>(0)
  const [whenMonth, setWhenMonth] = useState<number>(0)
  const [whenYear, setWhenYear] = useState<number>(0)
  const [whenHour, setWhenHour] = useState<number>(0)
  const [whoNum, setWhoNum] = useState<number>(0)
  const [error, setError] = useState<boolean>(false)
  const [data, setData] = useState<BookingData | null>(null)
  const title = id ? id.replace(/_\d+$/, '').replace(/_/g, ' ') : ''

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
        <div className='mt-[380px] md:mt-0 md:grid md:grid-cols-[1fr_300px] md:gap-10'>
          <div>
            <div>
              {data !== null ?
                <p className='text-sm/6 md:hidden'>booked on <span className='font-medium'> {formatDate(data.booked_time)}</span></p> :
                <div className="md:hidden animate-pulse bg-muted w-36 h-5 rounded-lg"></div>
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
                  <div className="animate-pulse bg-muted w-48 h-5 rounded-lg my-3"></div>
                  <div className="animate-pulse bg-muted w-full h-[400px] rounded-2xl overflow-hidden mb-8"></div>
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
                <div className='grid grid-cols-1 md:grid md:grid-cols-[7fr_3fr] md:gap-8 lg:grid-cols-[5fr_5fr] lg:gap-10'>
                  <div className='w-full h-auto'>
                    <div className='w-24 h-5 animate-pulse bg-muted rounded-lg mb-4 mx-auto' ></div>
                    <div className='grid grid-cols-7 gap-2'>
                      {Array.from({ length: 7 }).map((_, i) => (
                        <div key={i + 1} className='ml-[20%] w-[60%] h-4 animate-pulse bg-muted rounded-md mb-2'></div>
                      ))}
                    </div>
                    <div className='grid grid-cols-7 gap-1'>
                      {Array.from({ length: 42 }).map((_, i) => (
                        <div key={i + 1} className='aspect-square w-full h-full animate-pulse bg-muted rounded-full'></div>
                      ))}
                    </div>
                    <div className='w-14 h-6 animate-pulse bg-muted rounded-lg my-4 float-right' ></div>
                  </div>
                  <div className='grid grid-cols-3 gap-3 md:grid-cols-1 md:grid-rows-6 my-4'>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className='flex items-center justify-center w-full h-full animate-pulse bg-muted rounded-lg'>
                        <p className='text-border h-10 px-4 py-2'>{i + 10}:00</p>
                      </div>
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
                <div className="animate-pulse bg-muted w-36 h-12 rounded-lg mx-auto my-1"></div>
              }
            </div>
          </div>

          {data !== null ?
            <ConfirmBox json={data.exhibition} whenDay={whenDay} whenMonth={whenMonth} whenYear={whenYear} whenHour={whenHour} whoNum={whoNum}
              bookingID={data.id} bookedDate={data.booked_time} lat={data.latitude} lon={data.longitude} addr='' />
            :
            <div>
              <div className="hidden md:block bg-muted w-full h-[420px] mx-auto my-1 shadow-xl my-10 p-6 rounded-xl">
                <div className='border-b'>
                  <div className="bg-accent w-48 h-4 animate-pulse rounded-md my-1"></div>
                  <div className="bg-accent w-full h-7 animate-pulse rounded-md mt-2"></div>
                  <div className="bg-accent w-full h-5 animate-pulse rounded-md mt-2"></div>
                  <div className="bg-accent w-44 h-5 animate-pulse rounded-md mt-2"></div>
                  <div className="bg-accent w-12 h-5 animate-pulse rounded-md mt-2 mb-3"></div>
                </div>
                <div className='flex items-center pt-3'>
                  <Calendar1 className='pr-2 text-muted-foreground' />
                  <div className="bg-accent w-24 h-5 animate-pulse rounded-sm"></div>
                </div>
                <div className='flex items-center pt-2'>
                  <Clock3 className='pr-2 text-muted-foreground' />
                  <div className="bg-accent w-24 h-5 animate-pulse rounded-sm"></div>
                </div>
                <div className='flex items-center py-2'>
                  <UserRound className='pr-2 text-muted-foreground' />
                  <div className="bg-accent w-4 h-5 animate-pulse rounded-sm"></div>
                </div>
                <div className='bg-accent w-full h-10 rounded-lg animate-pulse mt-4' ></div>
                <div className='bg-accent w-full h-10 rounded-lg animate-pulse mt-4' ></div>
              </div>
              <div className='md:hidden fixed border-t bottom-0 left-0 bg-muted w-full h-[80px] grid grid-cols-[1fr_170px] items-center px-6 gap-4 z-100'>
                <div>
                  <div className='flex items-center'>
                    <Calendar1 className='pr-2 text-muted-foreground' />
                    <div className="bg-accent w-24 h-4 animate-pulse rounded-md"></div>
                  </div>
                  <div className='flex items-center'>
                    <Clock3 className='pr-2 text-muted-foreground' />
                    <div className="bg-accent w-24 h-4 animate-pulse rounded-md"></div>
                  </div>
                </div>
                <div className='flex'>
                  <div className='bg-accent w-[80px] h-10 rounded-lg animate-pulse' ></div>
                  <div className='bg-accent w-[80px] h-10 ml-[10px] rounded-lg animate-pulse' ></div>
                </div>
              </div>
            </div>
          }
        </div>

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
