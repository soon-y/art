import { createClient } from '@/utils/supabase/server'
import VisitDetailPage from '@/pages/visit-detail-client'

type Props = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const supabase = await createClient()
  const { id } = await params
  const match = id.match(/^(.*)_(\d+)$/)
  if (match) {
    const primaryID = match[2]
    const { data: history } = await supabase
      .from('history')
      .select(`
    *,
    exhibition (
      *
    )
  `).eq('id', primaryID)
      .single()

    return (
      <VisitDetailPage json={history ?? []} />
    )
  }
  return <p>Invalid ID format</p>
}
