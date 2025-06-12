import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server'

export async function GET() {
  const supabase = await createClient()

  try {
    const { data } = await supabase.from("notification").select(`*,booking (*,  exhibition (*))`).order("created_at", { ascending: true })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('FETCH ERROR:', error)
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}