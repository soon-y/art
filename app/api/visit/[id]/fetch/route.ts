import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(req: NextRequest, context: { params: { id: string } }
) {
  const supabase = await createClient()
  const { id } = context.params
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