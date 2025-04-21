import { NextRequest, NextResponse } from 'next/server';

import { productDetails } from '@/app/api/products/constants';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const productDetail = productDetails.find((cat) => cat.id === id);

  if (!productDetail) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  const responseData = productDetail;

  return NextResponse.json(responseData);
}
