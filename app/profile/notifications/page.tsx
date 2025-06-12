'use client'

import { X } from 'lucide-react'
import Link from "next/link"
import { useState, useEffect, ReactNode } from 'react'
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
      console.log(result.data)
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

  const formatDateTime = (input: string): ReactNode => {
    const date = new Date(input)

    const datePart = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })

    const timePart = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })

    return (
      <>
        at <span className='font-semibold'>{timePart}</span> on <span className='font-semibold'>{datePart}</span>
      </>
    )
  }

  return (
    <>
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
          <div key={el.id} className='mb-2 bg-gray-50 p-4 rounded-lg'>
            <p className='text-gray-400 text-sm'>{day(el.created_at.toString())}</p>
            {el.booking ? (
              <Link href={`/visits/booking/${encodeURIComponent(el.booking.exhibition.title.replace(/ /g, "_"))}_${el.booking.id}`}>
                {el.activity.includes('book') &&
                  <p>
                    <span className='font-semibold'>{el.booking.exhibition.title} </span>
                    at {el.booking.exhibition.name} is booked for {el.booking.who} {el.booking.who === 1 ? 'person' : 'people'} {formatDateTime(el.booking.booking_time)}.
                  </p>}
                {el.activity.includes('update') &&
                  <p>
                    <span className='font-semibold'>{el.booking.exhibition.title} </span>
                    at {el.booking.exhibition.name} is changed to {el.booking.who} {el.booking.who === 1 ? 'person' : 'people'} {formatDateTime(el.booking.booking_time)}.
                  </p>}
              </Link>
            ) : (
              <p>Your booking for {el.activity} has been cancelled.</p>
            )}
          </div>
        ))
      ) : (
        Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className='mb-2 bg-gray-50 p-4 rounded-lg'>
            <div className="animate-pulse bg-gray-100 w-16 h-5 rounded-md mb-1"></div>
            <div className="animate-pulse bg-gray-100 w-full h-10 rounded-md md:h-5"></div>
          </div>
        ))
      )}

      {error && <Alert msg={
        <>
          Something went wrong.<br />
          Please try again.
        </>
      } />}
    </>
  )
}