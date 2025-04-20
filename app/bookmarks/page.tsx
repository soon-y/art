import { createClient } from '@/utils/supabase/server'
import Bookmark from '@/pages/bookmark'

export default async function Home() {
  const supabase = await createClient()
  const { data: exhibitions } = await supabase.from("exhibition").select("*").eq("bookmark", true).order('bookmark_time', { ascending: false })

  return (
    <>
      <Bookmark initialData={exhibitions ?? []} />
    </>
  )
}