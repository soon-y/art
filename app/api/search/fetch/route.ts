import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('search')
    .select('*')
    .eq('id', 1)

  if (error) {
    return NextResponse.json({ success: false, error }, { status: 500 })
  }
  return NextResponse.json({ success: true, data })
}