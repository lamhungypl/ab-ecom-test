import {
  GetAllTestCampaignPayload,
  GetAllTestCampaignResponse,
} from '@/features/ab-testing/active-tests/api/active-tests.types';
import {
  CreateTestCampaignPayload,
  CreateTestCampaignResponse,
  GenerateTestCampaignPayload,
  GenerateTestCampaignResponse,
} from '@/features/ab-testing/test-creation/api/test-creation.types';
import { baseUrl } from '@/features/common/common.constants';

export const getAllTestCampaign = async (payload: GetAllTestCampaignPayload) => {
  const res = (await fetch(`${baseUrl}/api/ab-tests/campaigns`).then((res) =>
    res.json()
  )) as GetAllTestCampaignResponse;
  return res;
};

export const createTestCampaign = async (payload: CreateTestCampaignPayload) => {
  const res = (await fetch(`${baseUrl}/api/ab-tests/campaigns`, {
    method: 'POST',
    body: JSON.stringify(payload),
  }).then((res) => res.json())) as CreateTestCampaignResponse;
  return res;
};

export const generateTestCampaign = async (payload: GenerateTestCampaignPayload) => {
  const res = (await fetch(`${baseUrl}/api/ab-tests/campaigns/generate`, {
    method: 'POST',
    body: JSON.stringify(payload),
  }).then((res) => res.json())) as GenerateTestCampaignResponse;
  return res;
};
