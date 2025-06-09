import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { ExhibitionData } from "@/types"

export async function GET() {
  const supabase = await createClient()

  try {
    const { data: exhibition } = await supabase.from("exhibition").select("*").order("title", { ascending: true })
    const { data: search } = await supabase.from('search').select('*').eq('id', 1).single()
    const searchDate = new Date(search?.date)

    const filteredExhibition: ExhibitionData[] = (exhibition || []).filter((ex) => {
      const dateFrom = new Date(ex.date_from)
      const dateTo = new Date(ex.date_to)
      return searchDate >= dateFrom && searchDate <= dateTo
    })

    return NextResponse.json({ success: true, filteredExhibition })
  } catch (error) {
    console.error('FETCH ERROR:', error)
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}