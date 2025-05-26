import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data: exhibition } = await supabase.from("exhibition").select("*")
  const { data: search } = await supabase.from('search').select('*').eq('id', 1).single()
  const searchDate = new Date(search?.date)

  const filteredExhibition = (exhibition || []).filter((ex) => {
    const dateFrom = new Date(ex.date_from)
    const dateTo = new Date(ex.date_to)
    return searchDate >= dateFrom && searchDate <= dateTo;
  })

  return NextResponse.json({ success: true, data: filteredExhibition })
}