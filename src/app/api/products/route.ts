import { NextResponse } from 'next/server';

import { products } from '@/app/api/products/constants';
import { ResponseList } from '@/features/_api/api.types';
import { Product } from '@/features/products/api/products.type';

export async function GET() {
  const mockProducts = {
    data: products,
    meta: {},
  } satisfies ResponseList<Product>;

  return NextResponse.json(mockProducts);
}
