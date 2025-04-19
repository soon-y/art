import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { id } = await request.json()

  const { data, error } = await supabase
    .from('booking')
    .delete()
    .eq('id', id)

  return NextResponse.json({ data, error })
}
