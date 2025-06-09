import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server'

export async function GET() {
  const supabase = await createClient()

  try {
    const { data: booking, error: bookingError } = await supabase.from("booking").select("*")

    if (bookingError) {
      console.error("Error fetching bookings:", bookingError)
    }

    if (booking) {
      const now = new Date()
      const pastBookings = booking.filter(b => new Date(b.booking_time) < now)
      if (pastBookings.length > 0) {
        const { error: insertError } = await supabase.from("history").insert(pastBookings)
        if (!insertError) {
          const idsToDelete = pastBookings.map(b => b.id)
          await supabase.from("booking").delete().in("id", idsToDelete)
        } else {
          console.error("Error inserting into history:", insertError)
        }
      }
    }

    const { data: history, error: historyError } = await supabase
      .from("history")
      .select(`*,
    exhibition:exhibition (
      name, title, imgid, content, price, bookmark, bookmark_time, date_from, date_to
    )
  `).order('booking_time', { ascending: false })


    const { data: booked, error: bookedError } = await supabase
      .from("booking")
      .select(`*,
    exhibition:exhibition (
      name, title, imgid, content, price, bookmark, bookmark_time, date_from, date_to
    )
  `).order("booking_time", { ascending: true })

    if (bookingError) {
      console.error("Error fetching bookings:", bookedError)
    }

    if (historyError) {
      console.error("Error fetching history:", historyError)
    }

    return NextResponse.json({ success: true, history, booked })
  } catch (error) {
    console.error('FETCH ERROR:', error)
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}