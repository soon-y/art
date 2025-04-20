import { createClient } from '@/utils/supabase/server'
import BookingPage from '@/pages/booking-detail-client'

type Props = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const supabase = await createClient()
  const { id } = await params
  const readableTitle = decodeURIComponent(id.replace(/_/g, " "))
  const { data: booked } = await supabase
  .from('exhibition')
  .select(`
    *,
    booking:booking (
      id,
      address,
      who,
      booked_time,
      booking_time
    )
  `)
  .eq('title', readableTitle)
  .single()



  return (
    <BookingPage json={booked ?? []} />
  )
}
