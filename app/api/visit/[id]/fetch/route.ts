import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(req: NextRequest){
  const supabase = await createClient()
  const url = new URL(req.url)
  const pathnameParts = url.pathname.split('/')
  const id = pathnameParts[pathnameParts.length - 2]
  const match = id.match(/^(.*)_(\d+)$/)
  try {
    if (match) {
      const primaryID = match[2]
      const { data: history } = await supabase.from('history').select(`*, exhibition (*)`).eq('id', primaryID).single()
      return NextResponse.json({ success: true, history })
    }

  } catch (error) {
    console.error('FETCH ERROR:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch' }, { status: 500 })
  }
}