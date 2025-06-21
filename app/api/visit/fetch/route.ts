import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server'

export async function GET() {
  const supabase = await createClient()

  try {
    const { data: booking, error: bookingError } = await supabase.from("booking").select("*")

    if (bookingError) {
      console.error("Error fetching bookings:", bookingError)
    } else {

      const now = new Date()
      const pastBookings = booking.filter(b => new Date(b.booking_time) < now)

      if (pastBookings.length > 0) {
        const pastHistory = pastBookings.map(b => ({
          who: b.who,
          booking_time: b.booking_time,
          booked_time: b.booked_time,
          address: b.address,
          ex_id: b.ex_id
        }))

        const { error: insertError } = await supabase.from("history").insert(pastHistory)
        const idsToDelete = pastBookings.map(b => b.id)
        const { error: deleteError } = await supabase.from("booking").delete().in("id", idsToDelete)

        if (insertError) { console.error("Error fetching bookings:", insertError) }
        if (deleteError) { console.error("Error fetching history:", deleteError) }
        if (!insertError && !deleteError) {
          const { data: history, error: historyError } = await supabase.from("history").select(`*, exhibition:exhibition (*)`).order('booking_time', { ascending: false })
          const { data: booked, error: bookedError } = await supabase.from("booking").select(`*,exhibition:exhibition (*)`).order("booking_time", { ascending: true })

          if (bookingError) { console.error("Error fetching bookings:", bookedError) }
          if (historyError) { console.error("Error fetching history:", historyError) }

          return NextResponse.json({ success: true, history, booked })
        }

      } else {

        const { data: history, error: historyError } = await supabase.from("history").select(`*, exhibition:exhibition (*)`).order('booking_time', { ascending: false })
        const { data: booked, error: bookedError } = await supabase.from("booking").select(`*,exhibition:exhibition (*)`).order("booking_time", { ascending: true })

        if (bookingError) { console.error("Error fetching bookings:", bookedError) }
        if (historyError) { console.error("Error fetching history:", historyError) }

        return NextResponse.json({ success: true, history, booked })
      }
    }
  } catch (error) {
    console.log('FETCH ERROR:', error)
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}