import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import {
  createTestCampaign,
  generateTestCampaign,
} from '@/features/ab-testing/test-creation/api/test-creation.api';
import {
  CreateTestCampaignPayload,
  CreateTestCampaignResponse,
  GenerateTestCampaignPayload,
  GenerateTestCampaignResponse,
} from '@/features/ab-testing/test-creation/api/test-creation.types';

export const useCreateTestCampaignMutation = (
  options?: Partial<UseMutationOptions<CreateTestCampaignResponse, any, CreateTestCampaignPayload>>
) => {
  return useMutation({ ...options, mutationFn: createTestCampaign });
};

export const useGenerateTestCampaignMutation = (
  options?: Partial<
    UseMutationOptions<GenerateTestCampaignResponse, any, GenerateTestCampaignPayload>
  >
) => {
  return useMutation({ ...options, mutationFn: generateTestCampaign });
};
