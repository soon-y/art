import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(req: NextRequest){
  const supabase = await createClient()
  const url = new URL(req.url)
  const pathnameParts = url.pathname.split('/')
  const id = pathnameParts[pathnameParts.length - 1]
  try {
    const readableTitle = decodeURIComponent(id.replace(/_/g, ' '))

    const { data: exhibition } = await supabase.from('exhibition').select('*').eq('title', readableTitle).single()

    return NextResponse.json({ success: true, exhibition })
  } catch (error) {
    console.error('FETCH ERROR:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch' }, { status: 500 })
  }
}
