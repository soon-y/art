import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const body = await request.json()
  const { id, newData } = body

  const { error } = await supabase
    .from('search')
    .update(newData)
    .eq('id', 1)

  if (error) {
    console.error(error)
    return NextResponse.json({ success: false, error }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}