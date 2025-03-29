import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma'

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const exhibitionId = parseInt(id, 10)

    if (isNaN(exhibitionId)) {
      return NextResponse.json({ error: 'Invalid exhibition ID' }, { status: 400 })
    }

    const exhibition = await prisma.exhibition.findUnique({
      where: { id: exhibitionId },
    })

    if (!exhibition) {
      return NextResponse.json({ error: 'Exhibition not found' }, { status: 404 })
    }

    const updatedExhibition = await prisma.exhibition.update({
      where: { id: exhibitionId },
      data: { bookmark: !exhibition.bookmark },
    })

    return NextResponse.json(updatedExhibition)
  } catch (error) {
    console.error('Error updating bookmark:', error)
    return NextResponse.json({ error: 'Failed to update bookmark' }, { status: 500 })
  }
}