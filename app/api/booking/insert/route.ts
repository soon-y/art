import { NextResponse, NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { newBooking } = await request.json()

    const { data: lastBooking, error: newBookingIDerror } = await supabase.from('booking').select('id').order('id', { ascending: false }).limit(1)

    const newBookingID = (lastBooking?.[0]?.id ?? 0) + 1

    const notification = {
      booking_id: newBookingID,
      activity: 'book',
    }

    const { data: bookingData, error: bookingError } = await supabase.from('booking').insert([newBooking])

    const { data: notificationData, error: notificationError } = await supabase.from('notification').insert([notification])

    if (bookingError || notificationError || newBookingIDerror) {
      return NextResponse.json(
        {
          success: false,
          error: {
            booking: bookingError?.message,
            notification: notificationError?.message,
            id: newBookingIDerror?.message,
          },
        },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, bookingData, notificationData })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to insert' }, { status: 500 })
  }
}