import { NextRequest, NextResponse } from 'next/server';

import { campaignsAdapter, campaignState } from '@/app/api/ab-tests/campaigns/constants';

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const campaign = campaignsAdapter.selectById(campaignState, id);
  if (campaign) {
    return Response.json(campaign);
  }
  return NextResponse.json('Campaigns not found', { status: 400 });
};
