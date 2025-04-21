import { createClient } from '@/utils/supabase/server'
import Explore from '@/pages/explore'

export default async function Home() {
  const supabase = await createClient()
  const { data: exhibitions, error } = await supabase.from("exhibition").select("*")

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
        console.log("Offending data:", ex)
      }
      
      const { error: deleteError } = await supabase.from("exhibition").delete().eq("id", ex.id)

      if (deleteError) {
        console.error(`Error deleting exhibition ${ex.id}:`, deleteError)
      }
    }
  }

  const { data: exhibition } = await supabase.from("exhibition").select("*")

  return (
    <>
      <Explore initialData={exhibition ?? []} />
    </>
  )
}