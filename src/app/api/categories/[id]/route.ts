import { NextRequest, NextResponse } from 'next/server';

import { categories } from '@/app/api/categories/constants';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const category = categories.find((cat) => cat.id === id);

  if (!category) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  }

  const responseData = category;

  return NextResponse.json(responseData);
}
