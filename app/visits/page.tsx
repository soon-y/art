import { createClient } from '@/utils/supabase/server'
import Visit from '@/pages/visit'

export default async function Home() {
  const supabase = await createClient()
  const { data: exhibitions } = await supabase.from("history").select("*").order('time', { ascending: false })

  return (
    <>
      <Visit initialData={exhibitions ?? []} />
    </>
  )
}