import { createClient } from '@/utils/supabase/server'
import BookingPage from '@/pages/booking-detail-client'

type Props = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const supabase = await createClient()
  const { id } = await params
  const match = id.match(/^(.*)_(\d+)$/)
  if (match) {
    const primaryID = match[2]
    const { data: booking } = await supabase
      .from('booking')
      .select(`
    *,
    exhibition (
      *
    )
  `).eq('id', primaryID)
      .single()

    return (
      <BookingPage json={booking ?? []} />
    )
  }
  return <p>Invalid ID format</p>
}
