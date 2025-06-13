'use client'

import { X, CalendarMinus, CalendarSync, CalendarPlus } from 'lucide-react'
import Link from "next/link"
import { useState, useEffect } from 'react'
import { NotificationData } from "@/types"
import Alert from "@/components/alert"

export default function Home() {
  const [error, setError] = useState<boolean>(false)
  const [data, setData] = useState<NotificationData[] | null>(null)

  useEffect(() => {
    fetchData()
  }, [])


  const fetchData = async () => {
    const res = await fetch('/api/notification')
    const result = await res.json()
    if (result.success) {
      setData(result.data)
    } else {
      setError(true)
      setTimeout(() => setError(false), 3000)
    }
  }

  const day = (timestamp: string): string => {
    const bookingDate = new Date(timestamp);
    const today = new Date();

    const bookingMidnight = new Date(bookingDate.getFullYear(), bookingDate.getMonth(), bookingDate.getDate());
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const diffTime = bookingMidnight.getTime() - todayMidnight.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === -1) return "Yesterday";

    return formatDate(new Date(timestamp))
  }

  const formatDate = (timestamp: Date) => {
    const date = new Date(timestamp)
    const fullDate = date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
    return fullDate
  }

  return (
    <div className='mb-12'>
      <div>
        <div className="py-4 flex justify-between items-center w-full">
          <h2 className="text-2xl font-bold">Notifications</h2>
          <Link href="/profile">
            <X className="text-muted-foreground" />
          </Link>
        </div>
      </div>

      {data !== null ? (
        data.map((el: NotificationData) => (
          <div key={el.id} className='mb-3 bg-muted p-4 rounded-xl'>
            <div className='flex place-content-between items-center text-gray-400 text-sm'>
              <div>
                {el.activity.includes('book') && <CalendarPlus className='w-6' strokeWidth={1.6} />}
                {el.activity.includes('update') && <CalendarSync className='w-6' strokeWidth={1.6} />}
                {el.activity.includes('delete') && <CalendarMinus className='w-6' strokeWidth={1.6} />}
              </div>
              <p className='text-sm'>{day(el.created_at.toString())}</p>
            </div>
            <div className='mt-1'>
              {el.activity.includes('book') &&
                <p>{el.title} is booked for {el.who} {el.who === 1 ? 'person' : 'people'} {el.booking_time}.</p>
              }
              {el.activity.includes('update') &&
                <p>{el.title} is changed to {el.who} {el.who === 1 ? 'person' : 'people'} {el.booking_time}.</p>
              }
              {el.activity.includes('delete') &&
                <p>Your booking for {el.title} for {el.who} {el.who === 1 ? 'person' : 'people'} {el.booking_time} has been cancelled.</p>
              }
            </div>
          </div>
        ))
      ) : (
        Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className='mb-3 bg-muted p-4 rounded-lg'>
            <div className='flex place-content-between items-center text-gray-400 mb-1'>
              <div className="animate-pulse bg-accent w-6 h-6 rounded-md"></div>
              <div className="animate-pulse bg-accent w-16 h-5 rounded-md"></div>
            </div>
            <div className="animate-pulse bg-accent w-full h-10 rounded-md md:h-5"></div>
          </div>
        ))
      )}

      {error && <Alert msg={
        <>
          Something went wrong.<br />
          Please try again.
        </>
      } />}
    </div>
  )
}