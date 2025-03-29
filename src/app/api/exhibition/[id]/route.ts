import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const exhibition = await prisma.exhibition.findUnique({
      where: { id: Number(id) },
    });

    if (!exhibition) {
      return NextResponse.json({ error: 'Exhibition not found' }, { status: 404 });
    }

    // Toggle the bookmark value
    const updatedExhibition = await prisma.exhibition.update({
      where: { id: Number(id) },
      data: { bookmark: !exhibition.bookmark }, // Toggle boolean
    });

    return NextResponse.json(updatedExhibition);
  } catch (error) {
    console.error('Error updating bookmark:', error);
    return NextResponse.json({ error: 'Failed to update bookmark' }, { status: 500 });
  }
}
