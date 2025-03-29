import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Ensure Prisma is properly imported

export async function GET() {
  try {
    const exhibitions = await prisma.exhibition.findMany({
      where: {
        bookmark: true
      },
    });

    return NextResponse.json(exhibitions);
  } catch (error) {
    console.error('Error fetching exhibitions:', error);
    return NextResponse.json({ error: 'Failed to fetch exhibitions' }, { status: 500 });
  }
}
