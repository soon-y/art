import { createClient } from '@/utils/supabase/server'
import DetailPage from '@/pages/detail-client'

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const supabase = await createClient()
  const id = await Promise.resolve(params.id)
  const readableTitle = id.replace(/_/g, ' ')
  const { data: exhibition } = await supabase.from("exhibition").select("*").eq("title", readableTitle).single()

  return(
    <DetailPage json={exhibition ?? []} />
  )
}