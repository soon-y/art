import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const exhibitions = await prisma.exhibition.findMany() // Fetch all exhibitions
    return NextResponse.json(exhibitions)
  } catch (error) {
    console.error('Error fetching exhibitions:', error)
    return NextResponse.json({ error: 'Failed to fetch exhibitions' }, { status: 500 })
  }
}
