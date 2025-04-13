import { createClient } from '@/utils/supabase/server'
import Bookmark from '@/components/bookmark'

export default async function Home() {
  const supabase = await createClient();
  const { data: exhibitions } = await supabase.from("exhibition").select("*").eq("bookmark", true)

  return (
    <>
      <Bookmark initialData={exhibitions ?? []} />
    </>
  )
}