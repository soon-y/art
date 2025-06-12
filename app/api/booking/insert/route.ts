import { NextResponse, NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { newBooking, notification } = await request.json()

    const { data: bookingData, error: bookingError } = await supabase.from('booking').insert([newBooking])
    const { data: notificationData, error: notificationError } = await supabase.from('notification').insert([notification])

    if (bookingError || notificationError ) {
      return NextResponse.json(
        {
          success: false,
          error: {
            booking: bookingError?.message,
            notification: notificationError?.message,
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