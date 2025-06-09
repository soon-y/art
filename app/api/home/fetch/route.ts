import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server'
import { ExhibitionData } from "@/types"

export async function GET() {
  const supabase = await createClient()

  try {
    const { data: exhibitions, error } = await supabase.from("exhibition").select("*")
    const { data: search } = await supabase.from("search").select("date").eq('id', 1).single()
    const searchDate = new Date(search?.date)

    if (error) {
      console.error("Error fetching exhibitions:", error)
      return
    }

    const today = new Date()

    for (const ex of exhibitions || []) {
      const dateTo = new Date(ex.date_to)
      if (dateTo < today) {

        const { id, ...el } = ex
        const { error: insertError } = await supabase.from("exhibition_past").insert(el)

        if (insertError) {
          console.error("Insert error:", insertError.message)
        }

        const { error: deleteError } = await supabase.from("exhibition").delete().eq("id", ex.id)

        if (deleteError) {
          console.error(`Error deleting exhibition ${ex.id}:`, deleteError)
        }
      }
    }

    const { data: exhibition } = await supabase.from("exhibition").select("*").order("title", { ascending: true })

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