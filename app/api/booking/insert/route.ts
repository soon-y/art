import { NextResponse, NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const body = await request.json();

  const { data, error } = await supabase
    .from('booking')
    .insert([body])

  if (error) {
    return NextResponse.json({ success: false, error }, { status: 500 })
  }
  return NextResponse.json({ success: true, data })
}