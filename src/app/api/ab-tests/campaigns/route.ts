import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

import { campaignsAdapter, campaignState } from '@/app/api/ab-tests/campaigns/constants';
import { testCreationSchema } from '@/features/ab-testing/test-creation/utils';

export const GET = async () => {
  const campaigns = campaignsAdapter.selectAll(campaignState);
  if (campaigns) {
    return Response.json(campaigns);
  }
  return NextResponse.json('Campaigns not found', { status: 400 });
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  try {
    const parsedData = testCreationSchema.parse(body);
    const nowUTC = new Date().toISOString();
    const newCampaign = { id: uuidv4(), created_at: nowUTC, ...parsedData };
    campaignsAdapter.addOne(campaignState, newCampaign);
    return NextResponse.json(newCampaign);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Invalid data', errors: error.errors }, { status: 500 });
    }
    return NextResponse.json({ message: 'Failed to create campaign' }, { status: 500 });
  }
};
