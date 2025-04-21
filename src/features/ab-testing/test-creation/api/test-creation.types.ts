import { TestCreationFormValues } from '@/features/ab-testing/test-creation/utils';

export type TestCampaign = {
  id: string;
} & TestCreationFormValues;

export type GenerateTestCampaignPayload = {
  pathname: string;
  target: string;
};

export type GenerateTestCampaignResponse = TestCampaign[];

export type CreateTestCampaignPayload = Omit<TestCampaign, 'id'>;
export type CreateTestCampaignResponse = TestCampaign;
