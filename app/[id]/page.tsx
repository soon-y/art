import { createClient } from '@/utils/supabase/server'
import DetailPage from '@/pages/detail-client'

type Props = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const supabase = await createClient()
  const { id } = await params
  const readableTitle = decodeURIComponent(id.replace(/_/g, " "))
  const { data: exhibition } = await supabase.from("exhibition").select("*").eq("title", readableTitle).single()

  return (
    <DetailPage json={exhibition ?? []} />
  )
}
