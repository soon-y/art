import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server'

export async function GET() {
  const supabase = await createClient()

  try {
    const { data: exhibitions } = await supabase.from("exhibition").select("*").eq("bookmark", true).order('bookmark_time', { ascending: false })

    return NextResponse.json({ success: true, exhibitions })
  } catch (error) {
    console.error('FETCH ERROR:', error)
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
} 