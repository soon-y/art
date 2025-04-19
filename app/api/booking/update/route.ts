import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const body = await request.json()
  const { id, newData } = body
  const { data, error } = await supabase
    .from('booking')
    .update(newData)
    .eq('id', id);

  return NextResponse.json({ data, error })
}