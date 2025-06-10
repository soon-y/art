import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(req: NextRequest){
  const supabase = await createClient()
  const url = new URL(req.url)
  const pathnameParts = url.pathname.split('/')
  const id = pathnameParts[pathnameParts.length - 1]
  const match = id.match(/^(.*)_(\d+)$/)
  try {
    if (match) {
      const primaryID = match[2]
      const { data: booking } = await supabase.from('booking').select(`*,exhibition (*)`).eq('id', primaryID).single()
      return NextResponse.json({ success: true, booking })
    }

  } catch (error) {
    console.error('FETCH ERROR:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch' }, { status: 500 })
  }
}