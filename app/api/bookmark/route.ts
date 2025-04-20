import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server'

export async function PUT(request: Request){
  const supabase = await createClient()
  const { id, bookmark }: { id: number; bookmark: boolean } = await request.json();

  try {
    const { error } = await supabase
      .from('exhibition')
      .update({ bookmark: !bookmark })
      .eq('id', id)
    if (error) throw error
    return NextResponse.json({ message: 'Bookmark updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}