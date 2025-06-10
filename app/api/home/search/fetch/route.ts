import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('search').select('*').eq('id', 1)

  if (error) {
    return NextResponse.json({ success: false, error }, { status: 500 })
  }

  const today: string = new Date().toISOString().split('T')[0]
  const prevDate: string = data[0].date?.split('T')[0]

  if (prevDate < today) {
    const { error: updateError } = await supabase.from('search').update({ date: today }).eq('id', 1)

    if (updateError) {
      return NextResponse.json({ success: false, error: updateError }, { status: 500 })
    }
    data[0].date = new Date(today)
  }

  return NextResponse.json({ success: true, data })
}