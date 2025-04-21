import { TestCampaign } from '@/features/ab-testing/test-creation/api/test-creation.types';
import { createEntityAdapter } from '@/features/common/utils/entities';

export const campaignsAdapter = createEntityAdapter<TestCampaign>();
export const campaignState = campaignsAdapter.getInitialState();
