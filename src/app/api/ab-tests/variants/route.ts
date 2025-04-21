import { NextRequest, NextResponse } from 'next/server';

import { createOrUpdateVariant, getAllVariants } from './variants.store';

export async function GET() {
  // This can come from DB, CMS, etc. For now it's hardcoded.

  return NextResponse.json(getAllVariants());
}

export async function POST(req: NextRequest) {
  const { key, options, description } = await req.json();

  if (!key || !Array.isArray(options)) {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  const newVariant = createOrUpdateVariant({ key, options, description });
  return NextResponse.json({ message: 'Created', variant: newVariant });
}
