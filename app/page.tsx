import { createClient } from '@/utils/supabase/server'
import Explore from '@/components/explore'

export default async function Home() {
  const supabase = await createClient();
  const { data: exhibitions } = await supabase.from("exhibition").select('*')

  return (
    <>
      <Explore initialData={exhibitions ?? []} />
    </>
  )
}