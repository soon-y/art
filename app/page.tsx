import { createClient } from '@/utils/supabase/server'
import Explore from '@/pages/explore'

export default async function Home() {
  const supabase = await createClient()
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

  const { data: exhibition } = await supabase.from("exhibition").select("*")

  const filteredExhibition = (exhibition || []).filter((ex) => {
    const dateFrom = new Date(ex.date_from)
    const dateTo = new Date(ex.date_to)
    return searchDate >= dateFrom && searchDate <= dateTo;
  })

  return (
    <>
      <Explore initialData={filteredExhibition ?? []} />
    </>
  )
}