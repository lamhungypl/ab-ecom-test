import { NextRequest, NextResponse } from 'next/server';

import { createOrUpdateVariant, deleteVariant, getVariant, VARIANT_TYPE } from '../variants.store';

export async function GET(_: NextRequest, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const variant = getVariant(key);
  if (!variant) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(variant);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ key: VARIANT_TYPE }> }
) {
  const { key } = await params;
  const { options, description } = await req.json();
  if (!Array.isArray(options)) {
    return NextResponse.json({ error: 'Invalid options' }, { status: 400 });
  }

  const updated = createOrUpdateVariant({
    key: key,
    options,
    description,
  });

  return NextResponse.json({ message: 'Updated', variant: updated });
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const deleted = deleteVariant(key);
  if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({ message: 'Deleted', key: key });
}
