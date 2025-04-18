import { createClient } from '@/utils/supabase/server'
import VisitDetailPage from '@/pages/visit-detail-client'

type Props = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const supabase = await createClient()
  const { id } = await params
  const readableTitle = decodeURIComponent(id.replace(/_/g, " "))
  const { data: exhibition } = await supabase.from("history").select("*").eq("title", readableTitle).single()

  return(
    <VisitDetailPage json={exhibition ?? []} />
  )
}