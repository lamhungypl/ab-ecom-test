import { NextResponse } from 'next/server';

import { categories } from '@/app/api/categories/constants';
import { ResponseList } from '@/features/_api/api.types';
import { Category } from '@/features/categories/api/categories.types';

export async function GET() {
  const mockCategories = {
    data: categories,
    meta: {},
  } satisfies ResponseList<Category>;

  return NextResponse.json(mockCategories);
}
