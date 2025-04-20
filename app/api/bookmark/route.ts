import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server'

export async function PUT(request: Request){
  const supabase = await createClient()
  const { id, bookmark, time }: { id: number; bookmark: boolean; time: string } = await request.json()

    const { data, error } = await supabase
      .from('exhibition')
      .update({ bookmark: !bookmark, bookmark_time: time })
      .eq('id', id)
    
    if (error) {
      return NextResponse.json({ success: false, error }, { status: 500 })
    }
    return NextResponse.json({ success: true, data })
}