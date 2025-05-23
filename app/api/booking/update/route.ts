import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const body = await request.json()
  const { id, newBooking } = body

  const { data, error } = await supabase
    .from('booking')
    .update(newBooking)
    .eq('id', id)

  if (error) {
    return NextResponse.json({ success: false, error }, { status: 500 })
  }
  return NextResponse.json({ success: true, data })
}