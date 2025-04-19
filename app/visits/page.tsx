import { createClient } from '@/utils/supabase/server'
import Visit from '@/pages/visit'

export default async function Home() {
  const supabase = await createClient()
  const { data: history } = await supabase.from("history").select("*").order('time', { ascending: false })
  const { data: booking } = await supabase.from("booking").select("*").order('time', { ascending: true })

  return (
    <>
      <Visit history={history ?? []} booking={booking ?? []} />
    </>
  )
}