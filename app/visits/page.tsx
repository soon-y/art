import { createClient } from '@/utils/supabase/server'
import Visit from '@/pages/visit-client'

export default async function Home() {
  const supabase = await createClient()
  const { data: history } = await supabase.from("history").select("*").order('time', { ascending: false })
  const { data: booked } = await supabase
    .from("booking")
    .select(` *,
    exhibition:exhibition (
      id, name, title, imgid, content, price, bookmark, bookmark_time
    )
  `).order('booking_time', { ascending: true })

  return (
    <>
      <Visit history={history ?? []} booked={booked ?? []} />
    </>
  )
}